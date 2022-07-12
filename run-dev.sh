#!/bin/zsh
VERSION=1.1

docker build -t nestjs-demo:${VERSION} .

docker run -it --rm -v $(PWD)/config:/usr/src/app/xcourier/config \
  -p 3001:3001 \
  --name nestjs-demo \
  -e URL_PREFIX="/api" \
  -e PORT=3001 \
  -e DEBUG=false -e BASIC_AUTH_USERNAME="root" \
  -e BASIC_AUTH_PASSWORD="root" -e TZ="Europe/Berlin" \
  nestjs-demo:$VERSION
