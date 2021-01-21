#!/bin/bash
###############
# The purpose of this script is to check if database processes are present
# by: f.witkowski64@gmail.com
# Run from whatever user
# DB sid input required
# code 0 - DB running
# code 5 - DB not running
# code 6 - no sid given
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
db_running=$(ps -ef | grep pmon | grep ${SID} | wc -l)
if [ ${db_running} -eq 1 ]; then
  exit 0
else
  exit 5
fi
