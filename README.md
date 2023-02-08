# BurpPy 
BurpPy forked from [federicodotta/Brida](https://github.com/federicodotta/Brida).
## Feature
Simply call the python script for the BurpSuite Plugin.

## sample
```python
import hashlib
import random
import time

RN = '\r\n'

def sign(hp):
    RNRN = RN+RN
    header_str, body = hp.split(RNRN)
    header_list = header_str.split(RN)
    act_method, path, http_version = header_list[0].split()
    header_map = dict(map(lambda s: s.split(": ", 1), header_list[1:]))
    '''=================='''
    header_map['fv'] = ''.join([chr(ord('0')+random.randint(0, 9)) for i in range(16) ])
    print( header_map['fv'])
    header_map['ts'] = str(int(round(time.time()*1000)))
    print( header_map['ts'])
    s = "abcdefghijklmnopqrstuvwxyz"+header_map['fv']+header_map['ts']
    if act_method == "POST":
        s += body.strip() # 可能需要解析json，把value用引号包裹
    s = s.encode()
    hs = hashlib.sha256()
    print(s)
    hs.update(s)
    header_map['sign'] = hs.hexdigest()
    '''================='''
    hp = RN.join([' '.join([act_method, path, http_version])]+[": ".join([k, header_map[k]]) for k in header_map]+["",body])
    return hp



def main():
    global RN
    RN = '\n'
    hp = '''POST /captiveportal/generate_204 HTTP/1.1
Host: edge-http.microsoft.com
Pragma: no-cache
Cache-Control: no-cache
Sec-Mesh-Client-Edge-Version: 109.0.1518.78
Sec-Mesh-Client-Edge-Channel: stable
Sec-Mesh-Client-OS: Windows
Sec-Mesh-Client-OS-Version: 10.0.22621
Sec-Mesh-Client-Arch: x86_64
Sec-Mesh-Client-WebView: 0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Connection: close
fv: 8354259598936351
ts: 1675839383929

{"idshopapplyclass":"106","pagenum":"1","pagesize":"10"}
'''
    print(sign(hp))

if __name__ == "__main__":
    main()
    exit()
    s = hashlib.sha256()    # Get the hash algorithm.
    s.update(b'abcdefghijklmnopqrstuvwxyz83542595989363511675839383929{"idshopapplyclass":"106","pagenum":"1","pagesize":"10"}')    # Hash the data.
    b = s.hexdigest()       # Get he hash value.
    print(b)
    a,b = [2, 3]
    print(a, b)

```
