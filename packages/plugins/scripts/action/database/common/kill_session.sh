###############
# The purpose of this script is to kill user session with given name
# by: f.witkowski64@gmail.com
# Run from oracle user
# DB sid input required
# No input required
# code 0 - Successfully killed user
# code 5 - Database not running
# code 6 - No sid given
# code 7 - Error while killing user
###############
RACLE_SID=""
while getopts "d:n:" options; do #FOR ARGUMENT INTERPRETATION
  case "$options" in
  d)
    SID=${OPTARG}
    ;;
  n)
    USER_NAME=${OPTARG}
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
if [ ${db_running} -ne 1 ]; then
  echo "[ERROR] DB is not running"
  exit 5
fi

result=$(
  sqlplus -s<<EOF
/as sysdba
SET ECHO ON
WHENEVER SQLERROR EXIT 1
SET serveroutput ON
BEGIN
  FOR r IN (select sid,serial# from v\$session where upper(username)=upper('${USER_NAME}'))
  LOOP
      dbms_output.put_line ('KILLING: ' || r.sid || ',' || r.serial#);
      EXECUTE IMMEDIATE 'alter system kill session ''' || r.sid  || ','
        || r.serial# || ''' immediate';
  END LOOP;
END;
/
EOF
)
if [ $? == 0 ]; then
  echo "[OK] user killed successfully"
  echo "${result}"
  exit 0
else
  echo "[ERROR] Error while killing user"
  exit 7
fi
