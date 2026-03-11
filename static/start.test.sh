#!/bin/bash

# Quick-Start Nosana-Node
# This script will start Nosana-Node and register for the Nosana Grid.

{ # this ensures the entire script is downloaded
  die () {
    echo >&2 "$@"
    exit 1
  }

  handle_options() {
    while [[ $# -gt 0 ]]; do
      case $1 in
        --pre-release)
          PRE_RELEASE="next"
          shift
          ;;
        --verbose)
          NOSANA_NODE_VERBOSE=true
          shift
          ;;
        --network=*)
          SOL_NET_ENV="${1#*=}"
          shift
          ;;
        --network)
          SOL_NET_ENV="$2"
          shift 2
          ;;
        *)
          shift
          ;;
      esac
    done
  }

  main() {
    PRE_RELEASE=""
    SOL_NET_ENV="mainnet"
    handle_options "$@"

    if ! check_cmd lsb_release; then
      log_err "🧯 Not running ubuntu."
      exit 1;
    fi

    if cat /proc/version | grep -q 'WSL2'; then
      WSL2=true
    fi
    ubuntu_version=$(lsb_release -sr)
    log_std "Running ubuntu version $ubuntu_version"
    if [[ $WSL2 == true ]]; then
        log_err "🧯 WSL2 is not supported."
        exit 1;
      
    fi

    log_std "🔥 Initializing Nosana-Node."
    # read -rp "Which network: devnet or mainnet? (default: devnet) " SOL_NET_ENV
    # SOL_NET_ENV="${SOL_NET_ENV:=mainnet}"

    # Make sure that the basics are installed
    downloader --check
    need_cmd read
    need_cmd printf
    need_cmd exit
    need_cmd read
    need_cmd echo

    if ! check_cmd docker; then
      log_err "🧯 Docker is not installed. Please install Docker first."
      log_err "🔋 Please follow installation instructions here: https://docs.docker.com/engine/install "
      exit 1
    else
      log_std "✅ Docker is installed. "
    fi

    # Check if docker is in user group, if docker is not part of the user group exit.
    if [[ "$(groups)" != *"docker"* ]]; then
      log_err "🧯 Docker is not part of its own user group, please add it to your user group. This is need to run Nosana without root privileges."
      log_err "🔋 Please visit the following link and follow the instructions: https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user "
      exit 1
    else
      log_std "✅ Docker is part of its own user group. "
    fi

    if ! check_cmd nvidia-smi; then
      log_err "🧯 Nvidia Drivers are not installed."
      log_err "🔋 Please follow installation instructions here: https://www.linuxbabe.com/ubuntu/install-nvidia-driver-ubuntu "
      exit 1
    else
      log_std "✅ Nvidia Drivers installed. "
    fi

    if ! check_cmd nvidia-ctk; then
      log_err "🧯 Nvidia Container Toolkit is not installed."
      log_err "🔋 Please follow installation instructions here: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html "
      exit 1
    else
      log_std "✅ Nvidia Container Toolkit installed. "
    fi

    docker rm --force podman &>/dev/null
    log_std "🔎 Checking if Nvidia Container Toolkit is configured.."
    if docker run --rm --gpus all nvidia/cuda:11.0.3-base-ubuntu18.04 nvidia-smi &>/dev/null; then
      log_std "✅ Nvidia Container Toolkit configured."
    else
      log_err "🧯 Nvidia Container Toolkit is not configured."
      log_err "🔋 Please follow configuration instructions here: https://docs.nosana.io/hosts/grid-ubuntu.html#linux-configure-the-nvidia-container-toolkit "
      log_err "🧯 If Nvidia Container Toolkit has been re-configured."
      log_err "🔋 Please removed unused podman resources. If you DO NOT use podman for anything outside of Nosana, simply run 'podman system prune' or else please manually remove unused podman images and volumes."
      exit 1
    fi
    
    log_std "🔥 Starting podman..."
    # Start Podman in docker

    if ! docker volume ls | grep podman-cache > /dev/null 2>&1; then
      docker volume create podman-cache > /dev/null 2>&1
    fi

    if ! docker volume ls | grep podman-socket > /dev/null 2>&1; then
      docker volume create podman-socket > /dev/null 2>&1
    fi

    docker run -d \
      --pull=always \
      --gpus=all \
      --name podman \
      --device /dev/fuse \
      --mount source=podman-cache,target=/var/lib/containers \
      --mount type=bind,source=$HOME/.nosana/,target=/root/.nosana \
      --privileged \
      --dns=1.1.1.1 \
      --dns=8.8.8.8 \
      -e ENABLE_GPU=true \
      -e NVIDIA_DRIVER_CAPABILITIES=all \
      nosana/podman:v1.1.0 unix:/podman.sock

    sleep 5 # wait for podman to start

    # Start Nosana-Node
    nosana_run_cmd
  }

  # Build nosana run command
  nosana_run_cmd() {
    docker exec podman sh -c 'podman ps -a -q --filter "ancestor=docker.io/nosana/nosana-node:latest" | xargs -r podman rm -f'
    docker exec podman sh -c 'podman images -f "dangling=true" -f "reference=docker.io/nosana/nosana-node:latest" -q | xargs -r podman rmi -f'

    if ! docker exec podman podman network ls | grep NOSANA_GATEWAY > /dev/null 2>&1; then
      docker exec podman podman network create --driver bridge --subnet=192.168.101.0/24 --gateway=192.168.101.1 NOSANA_GATEWAY --dns=1.1.1.1 --dns=8.8.8.8 > /dev/null 2>&1
    fi
    
    NOSANA_NODE_ARGS=(
      start
    )
    NOSANA_NODE_ARGS+=(--network "$SOL_NET_ENV")

    if [[ $NOSANA_NODE_VERBOSE == true ]]; then
      NOSANA_NODE_ARGS+=(--log trace);
      log_std "🔥 Starting Nosana-Node with verbose logging..."
    else
      log_std "🔥 Starting Nosana-Node..."
    fi

    if [[ $PRE_RELEASE == "next" ]]; then
      log_err "WARNING: Users may experience bugs and instability when running a pre-released version."
    fi

    DOCKER_ARGS=(
      --pull=always
      --name nosana-node
      --network NOSANA_GATEWAY
      --interactive -t
      --volume /root/.nosana/:/root/.nosana/
      --mount type=bind,source=/root/../podman.sock,target=/root/.nosana/podman/podman.sock
      -e CLI_VERSION=${PRE_RELEASE}
      -e NODE_OPTIONS=--dns-result-order=ipv4first
      --dns=1.1.1.1
      --dns=8.8.8.8
    )

    docker exec -it podman podman run \
      ${DOCKER_ARGS[@]} \
      docker.io/nosana/nosana-node:latest \
        ${NOSANA_NODE_ARGS[@]}

    log_std "\nNosana Node finished"
  }

  # shell swag
  # RED="\033[1;91m"
  # CYAN="\033[1;36m"
  # GREEN="\033[1;32m"
  # WHITE="\033[1;38;5;231m"
  # RESET="\033[0m"

  # logging
  log_std() { printf "\033[1;36m==> \033[1;38;5;231m${1}\033[0m\n" "${2}" "${3}"; }
  log_err() { printf "\033[1;91m==> \033[1;38;5;231m${1}\033[0m\n" "${2}" "${3}"; }

  need_cmd() {
    if ! check_cmd "$1"; then
      die "need '$1' (command not found)"
    fi
  }

  check_cmd() {
    command -v "$1" >/dev/null 2>&1
  }

  # Run a command that should never fail. If the command fails execution
  # will immediately terminate with an error showing the failing
  # command.
  ensure() {
    if ! "$@"; then
      die "command failed: $*"
    fi
  }

  # This is just for indicating that commands' results are being
  # intentionally ignored. Usually, because it's being executed
  # as part of error handling.
  ignore() {
    "$@"
  }

  # This wraps curl or wget. Try curl first, if not installed,
  # use wget instead.
  downloader() {
    if check_cmd curl; then
      program=curl
    elif check_cmd wget; then
      program=wget
    else
      program='curl or wget' # to be used in error message of need_cmd
    fi

    if [ "$1" = --check ]; then
      need_cmd "$program"
    elif [ "$program" = curl ]; then
      curl -sSfL "$1" -o "$2"
    elif [ "$program" = wget ]; then
      wget "$1" -O "$2"
    else
      die "Unknown downloader"
    fi
  }
  

  main "$@"

}
# Ensure that the whole script is downloaded
