set(TEST_SOURCES
    "${CORE_TEST_DIR}/cards_utest.cc"
    "${CORE_TEST_DIR}/game_utest.cc"
    "${CORE_TEST_DIR}/hand_utest.cc"
    )

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/955c7f837efad184ec63e771c42542d37545eaef.zip
)
FetchContent_MakeAvailable(googletest)

add_executable(core_tests ${TEST_SOURCES})
target_include_directories(core_tests PRIVATE ${CORE_DIR})
target_link_libraries(core_tests core_lib gtest_main)

include(GoogleTest)
gtest_discover_tests(core_tests)