#!/bin/bash
###############
# The purpose of this script is to start oracle database
# by: f.witkowski64@gmail.com
# Run from oracle user
# DB sid input required
# No input required
# code 0 - Successfully started Database
# code 5 - Database is running
# code 6 - No sid given
# code 7 - Error while starting database
###############
ORACLE_SID=""
while getopts "d:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  d)
    SID=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${SID} ]; then #Check if variable is empty
  exit 6
fi
ORACLE_SID=$SID
export ORACLE_SID
ORACLE_HOME=/u01/app/oracle/product/19.3.0/db_1
export ORACLE_HOME
source /home/oracle/.bash_profile
db_running=$(ps -ef | grep pmon | grep ${SID} | wc -l)
if [ ${db_running} -eq 0 ]; then
  srvctl start database -d ${SID}
  if [ $? == 0 ]; then
    exit 0
  else
    exit 7
  fi
else
  exit 5
fi
