#!/bin/sh

# This script is used to start the xcourier container.
# Only for docker image

cp -rf /templates/ /usr/src/app/xcourier/templates/mail-templates/ 2>/dev/null

node /usr/src/app/xcourier/main