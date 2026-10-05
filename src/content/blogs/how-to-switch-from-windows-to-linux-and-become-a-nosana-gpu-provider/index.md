---
category: "blog"
title: "How to Switch from Windows to Linux and Become a Nosana GPU Provider"
description: "Nosana GPU hosting runs on native Linux. Install Ubuntu alongside Windows with dual boot, keep your gaming PC, and put your RTX 4090 or RTX 5090 to work on the network."
thumbnail: "./assets/windows-linux.png"
createdAt: "2026-10-05"
tags:
  - "news"
---

Demand for high-performance RTX 4090 and RTX 5090 GPUs on the Nosana network is skyrocketing, vastly outstripping current supply. Substantial value in untapped compute power sits idle in high-end gaming rigs and workstations globally. For GPU owners, unlocking significant passive revenue is simply a matter of operating system alignment: Nosana's enterprise-grade infrastructure operates natively on Linux, while most consumer PCs run Windows.

If your RTX 4090 or RTX 5090 is in a Windows gaming PC or workstation, you can become a Nosana GPU provider without giving up Windows. Nosana connects GPU providers with developers running AI workloads, and providers receive payments in NOS for the customer jobs their hardware runs.

Nosana GPU hosting requires native Linux. This tutorial explains how to install Ubuntu alongside Windows using dual boot, prepare your GPU for hosting and connect it to the Nosana network. Before starting, we'll cover potential earnings and the uptime requirements for the RTX 4090 and RTX 5090 provider campaign.

## Why Nosana Hosting Runs on Linux

Nosana previously supported Windows using WSL2 (Windows Subsystem for Linux), which allowed GPU hosts to run inside a virtual environment. While WSL2 was a convenient starting point, running through virtualization added extra overhead and made managing GPU connections and system updates more complex.

Moving to native Linux gives Nosana direct access to your hardware. This unlocks maximum GPU power, speeds up task execution, and delivers rock-solid stability. Focusing fully on Linux allows us to build the most efficient and reliable network possible.

For GPU providers, this translates directly to higher earnings. On Nosana, uptime drives revenue. A stable native setup ensures your system qualifies for more jobs, earns maximum incentives, and qualifies for Premium market rates sooner.

Below, we will look at your earning potential and walk through a simple guide to set up Ubuntu Linux alongside Windows, so you can start earning on the Nosana network.

## How Much Can an RTX 4090 or RTX 5090 Earn on Nosana

Your revenue directly reflects your hardware, online uptime, and job volume. Below are the standard Premium market projections for top-tier RTX 4090 and RTX 5090 GPUs:

| | RTX 4090 | RTX 5090 |
|---|---|---|
| Market rate | $0.36 per hour | $0.45 per hour |
| Earnings at full utilization (30 days) | ~$262 | ~$327 |
| Campaign incentive per qualifying day | ~$1.75 | ~$2.18 |
| Campaign incentive (30 days) | ~$52 | ~$65 |

Rates as of October 1, 2026. Market rates can change. Earnings are paid in NOS.

[Estimate your earnings with the calculator](https://nosana.com/gpu-providers/)

## The RTX 4090 and RTX 5090 Campaign

Through November 17, eligible RTX 4090 and RTX 5090 hosts can enjoy an extra incentive equivalent to 20% daily utilization. That is just like earning for 4.8 hours of compute time every single day, on top of your regular earnings from active customer jobs!

To participate and start earning, simply make sure your host meets these quick guidelines:

- Runs an NVIDIA RTX 4090 or RTX 5090 GPU
- Is fully registered and verified on the Nosana network
- Maintains an online uptime of at least 85% each day

Every day your GPU is connected brings new reward opportunities, so the sooner you join us, the more you can make the most of this campaign!

[Read the full campaign details](https://nosana.com/blog/rtx-4090-5090-gpu-provider-campaign/)

## You Don't Have to Give up Windows

Switching to Linux doesn't mean wiping your PC. With a dual-boot setup, Windows and Ubuntu live side by side on the same machine. When you turn on your PC, you choose which one to start.

For hosting, we recommend this setup:

- **Ubuntu is the default.** Your PC starts in Ubuntu and the Nosana node runs automatically.
- **Windows is there when you need it.** Want to play a game or use a Windows-only app? Restart and pick Windows from the menu.
- **Back to hosting when you're done.** Restart again and you're back in Ubuntu.

There is one trade-off to keep in mind. While your PC is in Windows, your host is offline. To meet the campaign's 85% uptime requirement, your PC can be in Windows or switched off for at most about 3.5 hours a day. If you game for an evening, that's fine. If you game all day, you'll miss the incentive for that day.

If you have a spare PC or want the most uptime, you can also run Ubuntu on its own. Dual-boot is the easiest way to start if your GPU lives in your main PC.

## What the Switch Looks Like

You don't need to be a Linux expert. Most of the setup happens through graphical installers, and the terminal steps are copy and paste. Plan for about one to two hours.

1. **Prepare Windows.** Back up your files, save your BitLocker recovery key if you use it, and turn off Fast Startup.
2. **Make space for Ubuntu.** Add a second SSD (the simplest option) or free up at least 256GB on your current drive. Check that your PC meets the [hardware requirements](https://learn.nosana.com/hosts/grid.html).
3. **Create a bootable USB.** Download Ubuntu 26.04 LTS and write it to a USB stick with Rufus or balenaEtcher.
4. **Install Ubuntu alongside Windows.** Boot from the USB and choose to install Ubuntu next to Windows. [Ubuntu's installation tutorial](https://ubuntu.com/tutorials/install-ubuntu-desktop) walks through each installer screen.
5. **Install your NVIDIA drivers.** Ubuntu can install the recommended driver for your GPU with a single command.
6. **Install Docker and the NVIDIA Container Toolkit.** Docker and the NVIDIA Container Toolkit let Nosana run AI workloads on your GPU.
7. **Start the Nosana node.** Run one command to register your host and connect to the network.

Our step-by-step guide covers each of these steps in detail, including commands and fixes for common problems.

## Switching from Windows: Dual-Boot Ubuntu for Nosana Hosting

Nosana GPU hosting runs on native Linux only. Windows and WSL2 are no longer supported. If your GPU is in a Windows PC, this guide walks you through installing Ubuntu 26.04 LTS alongside Windows, so you keep Windows for gaming and everyday use and boot into Ubuntu to host on Nosana.

By the end of this guide you will have:

- Ubuntu 26.04 LTS installed next to Windows, set as the default boot option
- NVIDIA drivers, Docker, and the NVIDIA Container Toolkit installed
- The Nosana node running and registered on the Grid

### What You Need

- A PC with a supported NVIDIA GPU that meets the [hardware requirements](https://learn.nosana.com/hosts/grid.html) (12GB+ RAM, 256GB+ NVMe SSD for Ubuntu, 100 Mb/s down / 50 Mb/s up)
- A USB stick of 8GB or more (it will be erased)
- 256GB or more of free disk space. A second SSD just for Ubuntu is the safest and simplest option. Shrinking your Windows drive also works.
- About 1–2 hours

### Step 1: Prepare Windows

#### Already Hosted on Windows with WSL?

Welcome back. You can move your existing host and wallet to your new Ubuntu install, but we recommend starting with a new wallet. A fresh key on a fresh, native Linux setup is the cleanest start.

Before you remove WSL, make sure you have a backup of your old node key (`nosana_key.json`). You'll need it to access any funds in that wallet. The [setup guide](https://learn.nosana.com/hosts/grid-run.html) explains where to find it and how to move it if you decide to keep your existing wallet.

#### Back up Your Data

Partitioning is safe when done carefully, but mistakes can erase data. Back up anything important to an external drive or cloud storage before continuing.

#### Save Your BitLocker Recovery Key

If your Windows drive is encrypted with BitLocker (common on Windows 11), changing boot settings can trigger a recovery-key prompt. Find and save your key first:

- Go to [Microsoft's BitLocker recovery key page](https://aka.ms/myrecoverykey), or
- Open Command Prompt (Admin) and run:

```
manage-bde -protectors -get C:
```

Write the 48-digit recovery password down somewhere off this PC.

#### Turn off Fast Startup

Fast Startup leaves the Windows drive in a half-hibernated state, which can cause problems for dual-boot.

1. Open Control Panel → Power Options → Choose what the power buttons do
2. Click Change settings that are currently unavailable
3. Uncheck Turn on fast startup and save

#### Check That Windows Uses UEFI

Press Win + R, run `msinfo32`, and check that BIOS Mode says UEFI. Almost all modern PCs do. If it says Legacy, ask for help in [Discord](https://nosana.com/discord) before continuing.

### Step 2: Make Space for Ubuntu

Choose one of the options below.

#### Option A: Use a Second Drive (Recommended)

Install a second SSD of 256GB or more. You'll pick it during the Ubuntu install, and Windows stays untouched.

#### Option B: Shrink Your Windows Drive

1. Press Win + X and open Disk Management
2. Right-click your Windows drive (C:) and choose Shrink Volume
3. Enter the amount to shrink in MB. For 256GB, enter 262144
4. Leave the new space as Unallocated. Do not create a partition. The Ubuntu installer will use it.

### Step 3: Create a Bootable Ubuntu USB

1. Download [Ubuntu 26.04 LTS Desktop](https://ubuntu.com/download/desktop) from the Ubuntu website
2. Download [Rufus](https://rufus.ie/) or [balenaEtcher](https://etcher.balena.io/)
3. In Rufus, select your USB stick and the Ubuntu .iso file, set Partition scheme to GPT, and click Start

### Step 4: Boot from the USB

The easiest way from Windows:

1. Open Settings → System → Recovery
2. Next to Advanced startup, click Restart now
3. Choose Use a device and select your USB stick

Alternatively, restart and press your motherboard's boot-menu key while the PC starts (often F12, F11, F8 or Esc).

When the Ubuntu menu appears, choose Try or Install Ubuntu.

#### Secure Boot

You can leave Secure Boot enabled. Ubuntu supports it. When you install the NVIDIA drivers, you will be asked to set a password and enroll a key (MOK) on the next reboot. See [Ubuntu's NVIDIA driver guide](https://documentation.ubuntu.com/server/how-to/graphics/install-nvidia-drivers/) for details.

### Step 5: Install Ubuntu Alongside Windows

Follow the installer. At these screens, pay attention:

**Applications and updates:** check Install third-party software for graphics and Wi-Fi hardware. This installs the NVIDIA driver during setup.

**Disk setup:**

- Option A (second drive): choose Erase disk and install Ubuntu, then make sure you select the empty second drive. Check the drive size and model carefully. Selecting your Windows drive here will erase it.
- Option B (shrunk drive): choose Install Ubuntu alongside Windows Boot Manager. The installer will use the unallocated space.

**Account:** create your user and password.

When the installer finishes, remove the USB stick and restart.

### Step 6: Make Ubuntu the Default

After restarting you should see the GRUB menu, which lists Ubuntu and Windows Boot Manager. Ubuntu is selected by default.

If your PC boots straight into Windows, open your BIOS/UEFI settings (usually Del or F2 at startup) and move Ubuntu to the top of the boot order.

### Step 7: Install and Run the Nosana Host

Ubuntu is installed, so the last step is getting your GPU onto the network. Nosana's [Running the Host](https://learn.nosana.com/hosts/grid-run.html) guide covers everything:

- NVIDIA drivers and the NVIDIA Container Toolkit, so AI workloads can use your GPU
- Docker, which runs the Nosana node
- The start command, which checks your setup, benchmarks your hardware and registers your host

Once your host is online, connect your wallet at the [Nosana Host Dashboard](https://host.nosana.com/) to track its uptime and earnings.

## Common Questions

### Can I still play games?

Yes. Restart into Windows whenever you want to play. Many games also run on Linux through Steam and Proton. Check [ProtonDB](https://www.protondb.com/) to see how well your games run.

### Is installing Linux risky?

Dual-booting is safe when you follow the steps carefully and back up your data first. Using a second SSD for Ubuntu is the safest option, because your Windows drive stays untouched.

### Do I need to know the Linux terminal?

Only a little. The guide gives you every command to copy and paste, and our community in [Discord](https://nosana.com/discord) is ready to help if you get stuck. Running into an error? Check the [troubleshooting guide](https://learn.nosana.com/hosts/troubleshoot.html).

### Which Ubuntu version should I use?

Ubuntu 26.04 LTS, the latest long-term support release.

### Where can I see my uptime and earnings?

Connect your wallet on the [Nosana Host Dashboard](https://host.nosana.com/) to see your host's status, uptime and earnings.

## Put Your GPU to Work

Your RTX 4090 or RTX 5090 can power real AI workloads for developers around the world, and earn you money while it does. The switch to Linux takes an afternoon, Windows stays on your PC, and the campaign incentive runs until November 17.

Set up Ubuntu, start the node and bring your GPU online.

[Become a Nosana GPU provider](https://nosana.com/gpu-providers/)

Stuck during setup? Ask our community in [Discord](https://nosana.com/discord). We're happy to help.

## Useful Links

- [GPU Provider page and earnings calculator](https://nosana.com/gpu-providers/)
- [RTX 4090 and RTX 5090 campaign details](https://nosana.com/blog/rtx-4090-5090-gpu-provider-campaign/)
- [Running the Nosana Host guide](https://learn.nosana.com/hosts/grid-run.html)
- [GPU host documentation](https://learn.nosana.com/hosts/grid.html)
- [Host dashboard](https://host.nosana.com/)
- [Nosana Explorer: markets and queues](https://explore.nosana.com/markets)
- [Join the Discord](https://nosana.com/discord)
- [Follow us on X](https://nosana.com/x)
