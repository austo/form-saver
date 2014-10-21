#! /bin/bash

exedir='server'
exefile='srvdir.linux64'
currentdir=$(pwd)

if [[ $(uname) == 'Darwin' ]]; then
	exefile='srvdir.mac'
fi

cd $exedir

./$exefile -p=3000 -d=$currentdir
