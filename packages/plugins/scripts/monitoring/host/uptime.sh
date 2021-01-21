#!/bin/bash
###############
# The purpose of this script is to check if uptime of host is larger than provided value (in minutes)
# by: f.witkowski64@gmail.com
# Run from whatever user
# -t time "ex. -t 360"
# code 0 - System uptime greater than provided value
# code 5 - System uptime smaller than provided value
# code 6 - No value provided
###############
time=""
while getopts "t:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  t)
    time=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${time} ]; then
  exit 6
fi
uptime=$(echo $(awk '{print $1}' /proc/uptime) / 60 | bc)

#echo ${uptime}
#echo ${time}
if [ ${uptime} -gt ${time} ]; then
  exit 0
else
  exit 5
fi
