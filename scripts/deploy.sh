#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

echo -e "Host 159.203.228.62" >> ~/.ssh/config
echo -e "\tStrictHostKeyChecking no\n" >> ~/.ssh/config

scp -i travis-deploy $TRAVIS_BUILD_DIR/_site/ deploy@159.203.228.62:/var/www/html/
# rsync -e 'ssh -i travis-deploy' -r --delete-after --quiet $TRAVIS_BUILD_DIR/_site deploy@159.203.228.62:/var/www/html
