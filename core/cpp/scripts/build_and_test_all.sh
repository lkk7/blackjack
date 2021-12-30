#!/bin/bash
echo -e "---------- Building core ----------"
echo -e "---------- Starting CMake ----------"
mkdir -p build
cd build
cmake .. || { exit 1; }
echo -e "---------- 1/3: CMake successful ----------"
echo -e "---------- Starting make ----------"
make || { exit 1; }
echo -e "---------- 2/3: make successful ----------"
echo -e "---------- Starting tests ----------"
test/core_tests || { exit 1; }
echo -e "---------- 3/3: Tests successful ----------"
echo -e "---------- Finished successfully ----------"
