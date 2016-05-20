#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

# scp -i travis-deploy $TRAVIS_BUILD_DIR/_site/ root@159.203.228.62:/var/www/html/
cd _site
scp -r . root@159.203.228.62:/var/www/html
# rsync -e 'ssh -i travis-deploy' -r --delete-after --quiet $TRAVIS_BUILD_DIR/_site deploy@159.203.228.62:/var/www/html
