---
layout: "../../layouts/BlogPost.astro"
title: "Kali inside VirtualBox"
description: "Virtualizing Kali Linux inside of VirtualBox"
pubDate: "Sep 08 2022"
heroImage: "/blog/kali-linux/kali.webp"
---

This guide is about virtualizing Kali Linux inside of VirtualBox, allowing you to have a Kali VM. This is a great way to use Kali, as it is completely separate from the host, allows you to interact with other VMs (as well as the host machine and other machines on the network), and allows you to revert to snapshots.

Here is aother guide for you if you are trying to install VirtualBox on Kali Linux (as a [host](https://www.kali.org/docs/virtualization/install-virtualbox-host/)).

## Wizard

Upon starting up VirtualBox, select “New” (Machine -> New).

![select "New"](/blog/kali-linux/note-01.png)

The next screen is “Name and operating system” which is where you name the VM. This name is also used in any filenames (such as the configuration, hard disk and snapshot - which isn’t changed from this point).

We are keeping it generic in this guide (as Kali is a [rolling distribution](https://www.kali.org/docs/general-use/kali-branches/), and we update it), however for our releases, we use the version number in the name as it is a fixed release (`kali-linux-YYYY.N-vbox-ARCH`. Example: `kali-linux-2022.3-vbox-amd64`).

For the “Type”, we set it as Linux. For the “Version”, we are going to be using the x64 desktop image, so we are going to select `Debian (64-bit)`.

![select Debian (64-bit)](/blog/kali-linux/note-02.png)

“Memory size” is the next section, where we can define how much RAM to use. Again, the higher the amount of RAM, the more applications can be open and at increased performance. Various tools inside of Kali can be demanding of resources. When we make the general VMs, we select `2048 MB` (2GB) for RAM, but we often increase this for our personal machines as we have high-performing devices with spare RAM which Kali can utilize.

![select Memory size](/blog/kali-linux/note-03.png)

This screen below, “Hard disk”, allows us to `Create a new virtual disk` now.

![create a virtual disk](/blog/kali-linux/note-04.png)

For the “Hard disk file type”, we select `VDI (VirtualBox Disk Image)` (and its the default option).

![select Hard disk file type](/blog/kali-linux/note-05.png)

For the following screen, “Storage on physical hard disk”, we go with the default option of `Dynamically allocated`.

![choose storage](/blog/kali-linux/note-06.png)

Now with “File location and size”, we can now define how large the virtual hard disk will be. We use `80.00 GB` for our VMs.

![file location and size](/blog/kali-linux/note-07.png)

After clicking on “Create”, the wizard is complete.

# Customization

Now we click on “Settings”, to customize the VM further.

![customize the VM further](/blog/kali-linux/note-08.png)

In “General” -> “Advanced”, we make sure to set “Shared Clipboard” to `bidirectional`, as well as “Drag’n’Drop” to `bidirectional`

![Shared Clipboard](/blog/kali-linux/note-09.png)

In “System” -> “Motherboard”, we change the “Boot Order” to make sure `Hard Disk` is top and `Optical` is the second. Everything else is disabled.

![Motherboard](/blog/kali-linux/note-10.png)

In “System” -> “Processor”, we increase the “Processor(s)” to be `2`.

At the same time, we also enable “Extended Features” for `Enable PAE/NX`.

![Extended PAE/NX](/blog/kali-linux/note-11.png)

In “Display” -> “Screen”, we make sure to have “Video Memory” set to 128 MB

Another item to point out is to make sure that “Accelerated 3D graphics” is **disabled**, as people have reported that causes issues.

![Screen](/blog/kali-linux/note-12.png)

The final settings view looks like the following:

![Screen](/blog/kali-linux/note-13.png)

## Start

When we are ready to go, press “Start”.

The first time we run it, we will get a prompt saying do we wish to mount an image to use as a “start-up disk”. We want to use our Kali image, rather than a physical drive, so we select the icon to the side of the drop down.

![Start](/blog/kali-linux/note-14.png)

A new pop up will open, “Optical Disk Selector”. We will now press “Add”, then navigate to where our ISO is located.

![Optical Disk Selector](/blog/kali-linux/note-15.png)

After pressing “Open”, we can see its been added, so we make sure its selected and press “Choose”.

![Optical Disk Selector 2](/blog/kali-linux/note-16.png)

All that is left now to do is press “Start”.

![Start](/blog/kali-linux/note-17.png)

After all this is done, we save, start up the VM, and then continue installing Kali Linux as we normally would for a [bare metal install](https://www.kali.org/docs/installation/hard-disk-install/).

During Kali Linux setup process, the [install wizard](https://gitlab.com/kalilinux/build-scripts/live-build-config/-/blob/master/simple-cdd/profiles/offline.downloads) should **detect if its inside a VM**. If it is, should then **automatically install any additional tools** (such as `virtualbox-guest-x11`) to give a better user experience.

<style>
  code {
    color: #F78C6C;
    background-color: #292D3E;
    padding: 0.1rem 0.25rem;
    border-radius: 0.36rem;
    margin: 0 0.2rem;
  }
</style>