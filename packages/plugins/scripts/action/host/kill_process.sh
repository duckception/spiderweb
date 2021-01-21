###############
# The purpose of this script is to kill process with given id
# by: f.witkowski64@gmail.com
# Run from root
# code 0 - Successfully stopped Database
# code 5 - Process not found
# code 6 - No process id given
# code 7 - Error while killing process
###############

proc_id=""
while getopts "p:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  p)
    proc_id=${OPTARG}
    ;;
  *)
    exit 1
    ;;
  esac
done
if [ -z ${proc_id} ]; then #Check if variable is empty
  exit 6
fi

proc_alive=$(ps -ef | grep ${proc_id} | wc -l)
if [ ${proc_alive} != 2 ]; then
  echo "[ERROR] Process not found"
  exit 5
fi

kill -9 ${proc_id}
if [ $? != 0 ]; then
  echo "[ERROR] Error while killing process"
  exit 7
else
  echo "[OK] Process killed successfully"
  exit 0
fi