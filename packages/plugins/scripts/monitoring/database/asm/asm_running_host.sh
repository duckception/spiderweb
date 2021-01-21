#!/bin/bash
###############
# The purpose of this script is to check if ASM processes are present
# by: f.witkowski64@gmail.com
# Run from whatever user
# No input required
# code 0 - ASM running
# code 5 - ASM not running
###############
asm_running=$(ps -ef | grep pmon | grep +ASM | wc -l)
if [ ${asm_running} -gt 0 ]; then
    exit 0
else
    exit 5
fi
