#!/bin/bash

if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi


docker push gennyproject/alyson-v7:${version}
docker tag  gennyproject/alyson-v7:${version} gennyproject/alyson-v7:latest
docker push gennyproject/alyson-v7:latest

