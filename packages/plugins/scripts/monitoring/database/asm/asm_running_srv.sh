#!/bin/bash
###############
# The purpose of this script is to check if ASM processes are present
# by: f.witkowski64@gmail.com
# Run from oracle user
# No input required
# code 0 - ASM running
# code 5 - ASM not running
###############
srvctl status asm
if [ ${val} == 0 ]; then
    exit 0
else
    exit 5
fi
