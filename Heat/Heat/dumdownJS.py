#!/usr/bin/env python

import os

files = []
for file in os.listdir("public/js"):
    if file.endswith(".js"):
        filename = os.path.join("public/js", file)
        files.append(filename)

def dumdown(file):
    with open(file, 'r') as f :
      fh = f.read()

    fh = fh.replace('const ', 'var ')

    with open(file, 'w') as f:
      f.write(fh)


for file in files:
    dumdown(file)
    

