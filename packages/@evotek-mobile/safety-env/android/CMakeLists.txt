# Project
project(safetyenv)
cmake_minimum_required(VERSION 3.9.0)

# CMake variables
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

set(PACKAGE_NAME ${PROJECT_NAME})
set(BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set(RN_DIR ${NODE_MODULES_DIR}/../../../react-native)
set(SRC_DIR ${CMAKE_SOURCE_DIR}/src)

if(${RN_MAJOR_VERSION} GREATER_EQUAL 71)
  include("${RN_DIR}/ReactAndroid/cmake-utils/folly-flags.cmake")
  add_compile_options(${folly_FLAGS})
endif()

if(${RN_MAJOR_VERSION} GREATER_EQUAL 71)
  find_package(fbjni REQUIRED CONFIG)
  find_package(ReactAndroid REQUIRED CONFIG)

else()
  set(RN_SO_DIR ${PREBUILT_DIR})
  set(FBJNI_HEADERS_DIR ${RN_DIR}/ReactAndroid/src/main/jni/first-party/fbjni/headers)

  file(GLOB LIBRN_DIR ${RN_SO_DIR}/${ANDROID_ABI})
endif()

file(GLOB_RECURSE SRC_COMMON ${CMAKE_SOURCE_DIR}/../cpp/**.cpp)
file(GLOB_RECURSE SRC_ANDROID ${SRC_DIR}/main/cpp/**.cpp)
file(GLOB_RECURSE SRC_GENERATED ${BUILD_DIR}/cpp/generated/**.cpp)

file(GLOB COMMON_HEADER ${CMAKE_SOURCE_DIR}/../cpp)
file(GLOB GENERATED_HEADER ${BUILD_DIR}/cpp/generated)

if(${RN_MAJOR_VERSION} LESS 66)
  file(
    TO_CMAKE_PATH
    ${RN_DIR}/ReactCommon/jsi/jsi/jsi.cpp
    INCLUDE_JSI_CPP
  )
endif()

# Add library
add_library(

  # Name of the library.
  ${PACKAGE_NAME}

  # Sets the library as a shared library.
  SHARED

  # Provides a relative path to your source file(s).
  ${SRC_COMMON}
  ${SRC_ANDROID}
  ${SRC_GENERATED}
  ${INCLUDE_JSI_CPP}
)

# Include libraries needed for safetyenv lib
target_include_directories(

  # Specifies the target library.
  ${PACKAGE_NAME}

  # PRIVATE: Only used by this library
  PRIVATE

  # Provides a relative path to your source file(s).
  ${COMMON_HEADER}
  ${GENERATED_HEADER}
)

if(${RN_MAJOR_VERSION} LESS 71)
  file(GLOB LIBFBJNI_INCLUDE_DIR ${FBJNI_HEADERS_DIR})
  target_include_directories(

    # Specifies the target library.
    ${PACKAGE_NAME}

    # PRIVATE: Only used by this library
    PRIVATE

    # Provides a relative path to your source file(s).
    ${LIBFBJNI_INCLUDE_DIR}
    ${RN_DIR}/React
    ${RN_DIR}/React/Base
    ${RN_DIR}/ReactCommon/jsi
  )
endif()

# Build the safetyenv library
set_target_properties(${PACKAGE_NAME} PROPERTIES LINKER_LANGUAGE CXX)

target_link_libraries(

  # Specifies the target library.
  ${PACKAGE_NAME}

  # Links the target library to the log library
  # included in the NDK.
  log
  android
)

if(${RN_MAJOR_VERSION} GREATER_EQUAL 71)
  target_link_libraries(

    # Specifies the target library.
    ${PACKAGE_NAME}

    # Links the target library to the log library
    # included in the NDK.
    ReactAndroid::jsi
    ReactAndroid::reactnativejni
    fbjni::fbjni
  )
else()
  if(${RN_MAJOR_VERSION} LESS 66)
    # JSI lib didn't exist on RN 0.65 and before. Simply omit it.
    set(JSI_LIB "")
  else()
    find_library(
      JSI_LIB
      jsi
      PATHS ${LIBRN_DIR}
      NO_DEFAULT_PATH
      NO_CMAKE_FIND_ROOT_PATH
    )
  endif()

  find_library(
    REACT_NATIVE_JNI_LIB
    reactnativejni
    PATHS ${LIBRN_DIR}
    NO_DEFAULT_PATH
    NO_CMAKE_FIND_ROOT_PATH
  )

  target_link_libraries(

    # Specifies the target library.
    ${PACKAGE_NAME}

    # Links the target library to the log library
    # included in the NDK.
    ${REACT_NATIVE_JNI_LIB}
    ${JSI_LIB}
  )
endif()
