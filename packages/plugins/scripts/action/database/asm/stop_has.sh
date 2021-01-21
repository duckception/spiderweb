#!/bin/bash
###############
# The purpose of this script is to stop oracle High Availability Service
# y: f.witkowski64@gmail.com
# Run from oracle user
# DB sid input required
# No input required
# code 0 - Successfully stopped HAS
# code 5 - HAS is not running
# code 7 - Error while stopping HAS
###############
ORACLE_SID=$(cat /etc/oratab | grep '+ASM' | cut -d ":" -f1)
source /u01/scripts/set_env.sh $ORACLE_SID
(crsctl check has | grep "CRS-4639")
if [ $? != 0 ]; then
  crsctl stop has
  if [ $? == 0 ]; then
    exit 0
  else
    exit 7
  fi
else
  exit 5
fi