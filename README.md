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

```
![image](https://user-images.githubusercontent.com/22868906/230308491-24f5fa54-d431-478d-ae39-a4aa2a536305.png)
![image](https://user-images.githubusercontent.com/22868906/230308107-0673e1c1-d3ca-4936-86dc-c6083362c32d.png)


