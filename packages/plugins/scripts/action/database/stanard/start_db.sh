###############
# The purpose of this script is to start oracle database
# by: f.witkowski64@gmail.com
# Run from oracle user
# DB sid input required
# No input required
# code 0 - Successfully stopped Database
# code 5 - Database already running
# code 6 - No sid given
# code 7 - Error while stopping database
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
if [ ${db_running} -gt 1 ]; then
  echo "[ERROR] DB is already running"
  exit 5
fi

sqlplus <<EOF
/as sysdba
SET ECHO ON
WHENEVER SQLERROR EXIT 1
startup
exit 0
EOF
if [ $? == 0 ]; then
  echo "[OK] database started successfully"
  exit 0
else
  echo "[ERROR] Error while starting database"
  exit 7
fi
