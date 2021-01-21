###############
# The purpose of this script is to count number of sessions on the database
# by: f.witkowski64@gmail.com
# Run from oracle user
# DB sid input required
# No input required
# code 0 - Data returned
# code 5 - Database not running
# code 6 - No sid given
# code 7 - Error while returning data
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
if [ ${db_running} != 1 ]; then
  echo "[ERROR] DB is not running"
  exit 5
fi

result=$(
  sqlplus -s <<EOF
/as sysdba
SET ECHO ON
SET HEADING OFF
WHENEVER SQLERROR EXIT 1
SELECT count(*) FROM v\$session;
exit
EOF
)
if [ $? != 0 ]; then
  echo "[ERROR] Error while returning data"
  exit 7
else
  echo "[OK] Finished successfully"
  echo ${result}
  exit 0
fi
