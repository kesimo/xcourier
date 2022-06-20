#!/bin/sh
VERSION=1.1

docker build -t nestjs-demo:${VERSION} .

docker run -it --rm -v $(PWD)/config:/usr/src/app/xcourier/config \
  nestjs-demo:$VERSION #/bin/sh