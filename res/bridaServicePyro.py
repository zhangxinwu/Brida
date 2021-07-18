# -*- coding: utf-8 -*-
import Pyro4
import sys
import importlib.util
import os


# reload(sys)
# sys.setdefaultencoding('utf-8')

class Unbuffered(object):
    def __init__(self, stream):
        self.stream = stream

    def write(self, data):
        self.stream.write(data)
        self.stream.flush()

    def writelines(self, datas):
        self.stream.writelines(datas)
        self.stream.flush()

    def __getattr__(self, attr):
        return getattr(self.stream, attr)


def path_import(absolute_path):
    spec = importlib.util.spec_from_file_location(absolute_path, absolute_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


@Pyro4.expose
class BridaServicePyro:
    def __init__(self, daemon, pyfile):
        sys.path.append(os.path.dirname(pyfile))
        self.daemon = daemon
        self.pyfile = pyfile
        self.script = path_import(self.pyfile)

    def callexportfunction(self, methodName, args):
        method_to_call = getattr(self.script, methodName)

        # Take the Java list passed as argument and create a new variable list of argument
        # (necessary for bridge Python - Java, I think)
        s = []
        for i in args:
            s.append(i)

        return_value = method_to_call(*s)
        return return_value

    @Pyro4.oneway
    def shutdown(self):
        print('shutting down...')
        self.daemon.shutdown()


# Disable python buffering (cause issues when communicating with Java...)
sys.stdout = Unbuffered(sys.stdout)
sys.stderr = Unbuffered(sys.stderr)

host = sys.argv[1]
port = int(sys.argv[2])
daemon = Pyro4.Daemon(host=host, port=port)

# daemon = Pyro4.Daemon(host='127.0.0.1',port=9999)
bs = BridaServicePyro(daemon, sys.argv[3])
uri = daemon.register(bs, objectId='BridaServicePyro')

print("Ready.")
daemon.requestLoop()
