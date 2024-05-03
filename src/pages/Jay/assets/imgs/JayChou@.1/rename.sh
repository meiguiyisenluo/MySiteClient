#!/bin/bash

# set -e

declare -i i=0

for file in *
do
	if [[ $file == "rename.sh"  ]]
       	then
		continue
	fi

	i=$i+1
	extension=${file##*.}
	mv "$file" "$i.$extension"
done
