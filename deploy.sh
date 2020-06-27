#!/bin/sh
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m "deploy" &&
git remote add origin git@gitee.com:rust404/bookkeeping-site.git &&
git push -u -f origin master &&
cd ..
