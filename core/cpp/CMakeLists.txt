cmake_minimum_required(VERSION 3.18)
project(
    "blackjack"
    LANGUAGES C CXX
)

### Helper variables
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -pedantic -O2 -fPIC")
set(CORE_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
set(CORE_BLACKJACK "${CORE_DIR}/blackjack")
set(CORE_TEST_DIR "${CMAKE_CURRENT_SOURCE_DIR}/test")
set(CORE_DEMO "${CORE_DIR}/demo")
set(SOURCES
    "${CORE_BLACKJACK}/card.cc"
    "${CORE_BLACKJACK}/game.cc"
    "${CORE_BLACKJACK}/hand.cc"
    )
set(HEADERS
    "${CORE_BLACKJACK}/card.hpp"
    "${CORE_BLACKJACK}/game.hpp"
    "${CORE_BLACKJACK}/hand.hpp"
    )
set(PYBIND11_DIR "${CMAKE_SOURCE_DIR}/extern/pybind11")
set(PYBIND11_HEADERS "${PYBIND11_DIR}/include")
set(PYBIND11_BINDINGS_DIR "${CMAKE_SOURCE_DIR}/python_bindings")
set(PYBIND11_PYTHON_VERSION "3.10")

### Core library
add_library(core_lib ${SOURCES} ${HEADERS})
target_include_directories(core_lib PRIVATE ${CORE_BLACKJACK} ${PYBIND11_HEADERS})

### Tests (as a subdirectory)
enable_testing()
add_subdirectory(${CORE_TEST_DIR})

### Demo (uses the core library)
add_executable(demo
               "${CORE_DEMO}/demo.cc"
               "${CORE_DEMO}/demo_helpers.cc"
               "${CORE_DEMO}/demo_helpers.hpp"
               ${HEADERS}
               )
target_include_directories(demo PRIVATE ${CORE_DIR})
target_link_libraries(demo core_lib)

### Add pybind11
add_subdirectory(${PYBIND11_DIR})
pybind11_add_module(cppcore MODULE "${PYBIND11_BINDINGS_DIR}/bindings.cc")
target_include_directories(cppcore PRIVATE ${CORE_DIR})
target_link_libraries(cppcore PRIVATE core_lib)
set_target_properties(cppcore PROPERTIES OUTPUT_NAME cppcore)

