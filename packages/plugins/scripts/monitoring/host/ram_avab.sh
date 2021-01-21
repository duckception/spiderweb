#!/bin/bash
###############
# The purpose of this script is to check if there is more RAM available than provided value (in MB)
# by: f.witkowski64@gmail.com
# Run from whatever user
# No input required
# code 0 - More ram than provided value
# code 5 - Less ram than provided value
# code 6 - No value provided
###############

RAM=""
while getopts "v:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  v)
    RAM=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${RAM} ]; then #Check if variable is empty
  exit 6
fi
mem_free=$(awk '/MemFree/ { printf "%.3f \n", $3/1024 }' /proc/meminfo)
mem_avab=$(awk '/MemAvailable/ { printf "%.3f \n", $2/1024 }' /proc/meminfo)
mem_free=$(echo ${mem_free} | awk '{print int($1)}')
mem_avab=$(echo ${mem_avab} | awk '{print int($1)}')
sum=$((${mem_free} + ${mem_avab}))
if [ ${sum} -gt ${RAM} ]; then
  exit 0
else
  exit 5
fi
