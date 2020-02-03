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
    fh = fh.replace('css/main.css','public/css/main.css')
    fh = fh.replace('/vendor/','node_modules/')
    fh = fh.replace('js/intro.js','public/js/intro.js')
    fh = fh.replace('js/main.js','public/js/main.js')
    fh = fh.replace('js/graph.js','public/js/graph.js')
    fh = fh.replace('https://use.fontawesome.com/','public/js/')
    fh = fh.replace('data/','public/data/')
    fh = fh.replace('images/ac.png','public/images/ac.png')

    
    with open(file, 'w') as f:
      f.write(fh)


for file in files:
    dumdown(file)
    

