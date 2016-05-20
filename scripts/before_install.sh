#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_22009518e18d_key -iv $encrypted_22009518e18d_iv -in travis-deploy.enc -out travis-deploy -d
rm travis-deploy.enc # Don't need it anymore
chmod 600 travis-deploy
mv travis-deploy ~/.ssh/id_rsa
