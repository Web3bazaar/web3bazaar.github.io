#!/bin/bash

##
##
##  Created by dr. Brown Jan 2022
##

echo " `date` : Build Project!"

line="\n#######################################################################\n";
build_folder=dist


echo " `date` : Create Branch gh-pages"

#git branch -D gh-pages
git checkout --orphan gh-pages

#git checkout  gh-pages

echo " `date` : Install and generate"


npm install
npm run generate

# add CNAME file to dist/
mv CNAME dist/

echo " `date` : Copy CNAME file"

# commit changes on branch gh-pages
git --work-tree $build_folder add --all
git --work-tree $build_folder commit -m gh-pages

echo " `date` : push project  "

# push branch gh-pages
git push origin HEAD:gh-pages --force

rm -f $build_folder

#git checkout -f master
#git branch -D gh-pages