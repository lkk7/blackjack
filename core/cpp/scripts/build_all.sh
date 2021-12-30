#!/bin/bash
echo -e "---------- Building core ----------"
echo -e "---------- Starting CMake ----------"
mkdir -p build
cd build
cmake .. || { exit 1; }
echo -e "---------- 1/2: CMake successful ----------"
echo -e "---------- Starting make ----------"
make || { exit 1; }
echo -e "---------- 2/2: make successful ----------"
echo -e "---------- Finished successfully ----------"
