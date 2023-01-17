#!/bin/bash

# Quick-Start Nosana-Node
# This script will start Nosana-Node and connect to the Nosana-Network.

{ # this ensures the entire script is downloaded

  main() {

    log_std "🔥 Initializing Nosana-Node."

    read -rp "Which network: devnet or mainnet? " SOL_NET_ENV
    read -rp "Please enter your jwt: " USER_PINATA_JWT
    read -rp "Please enter Nosana Market Address: " USER_NOS_MARKET_ADDRESS
    # read -p "🔑 Please enter your Nosana NFT address: " USER_NOS_NFT_ADDRESS

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

    # Check if solana is installed on the system
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
    if ! check_cmd solana; then
      # log_err "🧯 Solana is not installed. Please install Solana first."
      # log_err "🔋 Please visit the following link and follow the instructions: https://docs.solana.com/cli/install-solana-cli-tools "
      # exit 1
      log_err "🧯 Solana is not installed. Trying to install Solana."
      sh -c "$(curl -sSfL https://release.solana.com/v1.10.32/install)"
    else
      log_std "✅ Solana is installed. "
    fi

    # Check if there is a Solana Account on the system
    log_std "🔎 Checking if Solana Account is present."
    solana-keygen pubkey # Write status to variable $?
    if [ $? -eq 1 ]; then
      log_err "🧯 No Solana Account found."
      # log_err "🔋 Please visit the following link and follow the instructions: https://docs.solana.com/cli/conventions "
      # exit 1
      log_std "🧯 Trying to create a Solana Account, please provide the seed phrase for your Solana keypair that you use for your Nosana account."
      solana-keygen new --no-bip39-passphrase
    #   solana-keygen recover ASK
    else
      log_std "✅ Solana Account found. Sol balance for %s is %s" "$(solana address)" "$(solana balance --url $SOL_NET_ENV)"
    fi

    # Check if solana balance is large than 0,
    # split the string into an array, read and split the first element into an array, and read the first element of the array.
    IFS=' ' read -r -a array <<<"$(solana balance --url $SOL_NET_ENV)"
    SOLBAL=${array[0]}
    MINIMUM="0.05"

    log_std "🔎 Checking if solana balance is larger than %s" "$MINIMUM"

    # check if the balance is large than 0
    # bash does not support floating point numbers, so we use bc to do the comparison.
    # if output of bc is 1, then the balance is large than 0.
    if [ "$(echo "$SOLBAL < $MINIMUM" | bc -l)" -ne "0" ]; then

      # Airdrop some SOL to the Solana Account on Devnet
      log_std "🔋 Trying to airdrop SOL to your address on devnet. "
      #solana airdrop 1 "$(solana address)" --url $SOL_NET_ENV
      solana airdrop 0.1 --url $SOL_NET_ENV
      sleep 5

      IFS=' ' read -r -a array <<<"$(solana balance --url $SOL_NET_ENV)"
      SOLBAL=${array[0]}

      if [ "$(echo "$SOLBAL < $MINIMUM" | bc -l)" -ne "0" ]; then
        log_err "🧯 Solana balance is %s. Please deposit atleast %s SOL to your address and try again." "$(solana balance --url $SOL_NET_ENV)" "$MINIMUM"
        log_err "💰 Your address is: %s " "$(solana address)"
        exit 1
      else
        log_std "✅ Airdrop succesful. Solana balance is %s. " "$(solana balance --url $SOL_NET_ENV)"
      fi
    else
      log_std "✅ Solana balance okay"
    fi

    # Potential future feature, to create a Nos account if it does not exist.
    # Check if the Sol account has Nos account.
    #   if [];
    #     then
    #         # Create Nos account on Devnet. Check what mainnet is afterwards
    #     log_std "🧯 Creating Nos Account"
    #     spl-token create-account nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7 $(solana-keygen pubkey)
    #     else
    #     log_std "✅ Nos account okay"
    #   fi

    # This is not needed at the moment, but will be needed in the future.
    # read -n 44 -p "🔑 Please enter your Nosana NFT address: " NOSANA_NFT_ADDRESS

    # If podman is already running, stop it.
    log_std "🏓 Trying to remove Podman Nosana-Node container."
    docker rm --force podman nosana-node

    log_std "🔥 Starting podman..."
    # Start Podman

    # NEW WAY OF STARTING PODMAN
    docker run -d \
      --name podman \
      --device /dev/fuse \
      --security-opt seccomp=unconfined \
      --security-opt apparmor=unconfined \
      --security-opt label=disable \
      --cap-add sys_admin \
      --cap-add mknod \
      -p 8080:8080 \
      quay.io/podman/stable podman system service --time 0 tcp:0.0.0.0:8080

    log_std "🔥 Starting Nosana-Node..."

    sleep 10 # wait for podman to start

    # Start Nosana-Node
    docker run --rm -d \
      --name nosana-node \
      -p 3000:3000 \
      -e "SOLANA_NETWORK=$SOL_NET_ENV" \
      -e "PODMAN_CONN_URI=http://$(docker inspect -f '{{ .NetworkSettings.IPAddress }}' podman):8080" \
      -e "SOLANA_PRIVATE_KEY=$(<~/.config/solana/id.json)" \
      -e "NOSANA_MARKET=$USER_NOS_MARKET_ADDRESS" \
      -e "PINATA_JWT=$USER_PINATA_JWT" \
      nosana/nosana-node:latest

    log_std "Nosana Node running in background, attaching to logs to show status. You can close this window at any time."
    log_std "To check logs run: docker logs nosana-node"

    docker logs -f nosana-node
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
