#!/bin/bash

if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi


docker push gennyproject/alyson-7:${version}
docker tag  gennyproject/alyson-7:${version} gennyproject/alyson-7:latest
docker push gennyproject/alyson-7:latest

