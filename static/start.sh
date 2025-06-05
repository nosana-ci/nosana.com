#!/bin/bash

# Quick-Start Nosana-Node
# This script will start Nosana-Node and register for the Nosana Grid.

{ # this ensures the entire script is downloaded
  die () {
    echo >&2 "$@"
    exit 1
  }

  handle_options() {
    for var in "$@"; do
      case $var in
        --pre-release)
          PRE_RELEASE="next"
          ;;
        --verbose)
          NOSANA_NODE_VERBOSE=true
          ;; 
        esac
          shift
    done
  }

  main() {
    PRE_RELEASE=""
    handle_options "$@"

    if ! check_cmd lsb_release; then
      log_err "🧯 Not running ubuntu."
      exit 1;
    fi

    if cat /proc/version | grep -q 'WSL2'; then
      WSL2=true
    fi
    ubuntu_version=$(lsb_release -sr)
    cat /proc/version | grep -q 'WSL2'
    log_std "Running ubuntu version $ubuntu_version"
    if [[ $WSL2 == true ]]; then
      log_std "Running on WSL2"
      if [[ $ubuntu_version != 22.04 ]]; then
        log_err "🧯 Not running ubuntu version 22.04 on WSL2."
        exit 1;
      fi
    fi

    log_std "🔥 Initializing Nosana-Node."

    # read -rp "Which network: devnet or mainnet? (default: devnet) " SOL_NET_ENV
    SOL_NET_ENV="${SOL_NET_ENV:=mainnet}"

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
      if [[ $WSL2 == true ]]; then
        if docker --version | grep -q 'could not be found in this WSL 2 distro'; then
          log_err "🧯 Docker Desktop is not running. Please install and start Docker Desktop first."
          log_err "🔋 Please follow installation instructions here: https://docs.docker.com/desktop/install/windows-install/ "
          exit 1
        fi
      fi
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
    
    # If podman/node are already running, stop it.
    if [ $(docker ps -a --format {{.Names}} -f name=nosana-node) ]; then
      if [ ! -d "logs" ]; then
        mkdir logs
      fi
      docker logs nosana-node >& logs/nosana-node.log
    fi

    docker rm --force podman nosana-node &>/dev/null
    kill -9 `pidof podman` &>/dev/null
    if [[ $WSL2 == true ]]; then
      if ! check_cmd podman; then
        log_err "🧯 Podman is not installed. Please install Podman first."
        log_err "🔋 Please follow installation instructions here: https://docs.nosana.io/hosts/grid-windows.html#podman"
        exit 1
      else
        if ! podman --version | grep -q 'version 4.'; then
          log_err "🧯 Podman is not the right version, need version >4.1"
          log_err "🔋 Please follow installation instructions here: https://docs.nosana.io/hosts/grid-windows.html#podman "
          exit 1
        fi
        log_std "✅ Podman v4 is installed. "
      fi

      log_std "🔎 Checking if Nvidia Container Toolkit is configured.."
      if podman run --rm --device nvidia.com/gpu=all --security-opt=label=disable ubuntu nvidia-smi -L &>/dev/null; then
        log_std "✅ Nvidia Container Toolkit configured. "
      else
        log_err "🧯 Nvidia Container Toolkit is not configured."
        log_err "🔋 Please follow configuration instructions here: https://docs.nosana.io/hosts/grid-windows.html#configure-the-nvidia-container-toolkit "
        log_err "🧯 If Nvidia Container Toolkit has been re-configured."
        log_err "🔋 Please removed unused podman resources. If you DO NOT use podman for anything outside of Nosana, simply run 'podman system prune' or else please manually remove unused podman images and volumes."
        exit 1
      fi

      log_std "🔥 Starting podman..."
      mkdir -p $HOME/.nosana/podman
      # Start Podman
      { podman system service --time 0 unix://$HOME/.nosana/podman/podman.sock & } 2> podman.log

      sleep 5 # wait for podman to start

      # Start Nosana-Node
      nosana_run_cmd

    else
      log_std "🔎 Checking if Nvidia Container Toolkit is configured.."
      if docker run --gpus all nvidia/cuda:11.0.3-base-ubuntu18.04 nvidia-smi &>/dev/null; then
        log_std "✅ Nvidia Container Toolkit configured. "
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
        --volume podman-socket:/podman \
        --privileged \
        -e ENABLE_GPU=true \
        -p 8080:8080 \
        nosana/podman:latest podman system service --time 0 unix:/podman/podman.sock

      sleep 5 # wait for podman to start

      # Start Nosana-Node
      nosana_run_cmd

    fi
  }

  # Build nosana run command
  nosana_run_cmd() {
    NOSANA_NODE_ARGS=(
      node start
    )
    NOSANA_NODE_ARGS+=(--network "$SOL_NET_ENV")

    if [[ $WSL2 == true ]]; then
      NOSANA_NODE_ARGS+=(--podman "http://$(ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'):8080")
    else 
      NOSANA_NODE_ARGS+=(--podman http://localhost:8080)
    fi

    if [[ $NOSANA_NODE_VERBOSE == true ]]; then
      NOSANA_NODE_ARGS+=(--log trace);
      log_std "🔥 Starting Nosana-Node with verbose logging..."
    else
      log_std "🔥 Starting Nosana-Node..."
    fi

    if [[ $PRE_RELEASE == "next" ]]; then
      log_err "WARNING: Users may experience bugs and instabilty when running a pre-released version."
    fi

    DOCKER_ARGS=(
      --pull=always
      --name nosana-node
      --network host
      --interactive -t
      --volume ~/.nosana/:/root/.nosana/
      -e CLI_VERSION=${PRE_RELEASE}
    )

    if [[ $WSL2 != true ]]; then
      DOCKER_ARGS+=(--volume podman-socket:/root/.nosana/podman:ro)
    fi

    docker run \
      ${DOCKER_ARGS[@]} \
      nosana/nosana-cli:latest \
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
      err "need '$1' (command not found)"
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
      err "command failed: $*"
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
      err "Unknown downloader" # should not reach here
    fi
  }
  

  main "$@"

}
# Ensure that the whole script is downloaded
