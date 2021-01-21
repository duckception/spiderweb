#!/bin/bash
###############
# The purpose of this script is to check if there is more CPU usage than provided value in %
# The command gathers statistics from 5 tests spread 2 seconds apart
# by: f.witkowski64@gmail.com
# Run from whatever user
# No input required
# code 0 - CPU used less than provided value
# code 5 - CPU used more than provided value
# code 6 - No value provided
###############

CPU=""
while getopts "c:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  c)
    CPU=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${CPU} ]; then #Check if variable is empty
  exit 6
fi
free_cpu=$(mpstat -P ALL 2 5 | grep Average | grep all | awk '{print $(NF)}')
free_cpu=$(echo ${free_cpu} | awk '{print int($1)}')
usage=$((100 - $free_cpu))
if [ ${CPU} -gt ${usage} ]; then
  exit 0
else
  exit 5
fi
