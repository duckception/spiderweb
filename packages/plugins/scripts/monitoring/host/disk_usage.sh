#!/bin/bash
###############
# The purpose of this script is to check if there are file systems filled more than provided value each value must be separated by |
# if d flag is used checking for one or more FS can be done each FS must be separated by |
# by: f.witkowski64@gmail.com
# Run from whatever user
# -v input required ex. "99|100"
# -d input optional ex. "sda1|sdb1"
# code 0 - All filesystems are below provided value
# code 5 - Filesystems above provided value found
# code 6 - No value provided
###############
sizes=""
drives=""
val=""
output=""
drives_flag=0
while getopts "v:d:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  v)
    sizes=${OPTARG}
    ;;
  d)
    drives=${OPTARG}
    drives_flag=1
    ;;
  *)
    exit 1
    ;;
  esac
done
#if [ -z ${drives} ]; then
#  exit 6
#fi
if [ -z ${sizes} ]; then #Check if variable is empty
  exit 6
fi

if [ ${drives_flag} -eq 1 ]; then
  val=$(df -h | egrep "${drives}" | egrep "${sizes}" | wc -l)
  output=$(df -h | egrep "${drives}" | egrep "${sizes}")
else
  val=$(df -h | egrep "${sizes}" | wc -l)
  output=$(df -h | egrep "${drives}" | egrep "${sizes}")
fi

if [ ${val} == 0 ]; then
#  echo ${output}
  exit 0
else
  echo "${output}"
  exit 5
fi
