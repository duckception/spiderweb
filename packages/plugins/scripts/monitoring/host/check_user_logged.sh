#!/bin/bash
###############
# The purpose of this script is to check if the provided user logged in in x last days
# by: f.witkowski64@gmail.com
# Run from whatever user
# code 0 - User not logged
# code 5 - User logged
# code 6 - On ore more values is missing
###############

user=""
days=""
while getopts "u:d:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  u)
    user=${OPTARG}
    ;;
  d)
    days=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${user} ]; then #Check if variable is empty
  exit 6
fi
if [ -z ${days} ]; then #Check if variable is empty
  exit 6
fi
history=$(lastlog -b 0 -t ${days} | cut -d " " -f 1)
check=$(echo ${history} | grep ${user} | wc -l)
if [ ${check} -eq 0 ]; then
  exit 0
else
  exit 5
fi
