---
layout: "../../layouts/BlogPost.astro"
title: "The connections in VMware"
description: "The difference between them"
pubDate: "Sep 10 2022"
heroImage: "/blog/vmware-connections/vmware-workstation-pro-16.jpg"
---

# 三种网络连接模式

NAT模式下的VMnet8虚拟网络，host-only模式下的VMnet1虚拟网络，以及bridged模式下的VMnet0虚拟网络，都是由VMware虚拟机自动配置而生成的，不需要用户自行设置。

## bridged (桥接模式)

在这种模式下，虚拟系统就像是局域网中的一台独立的主机，与宿主计算机平等的存在于网络中，你必须像对待局域网中的其他真正的主机一样来对待它（比如分配你的局域网所要求的网络地址、子网掩码、网关等）。而且还要和宿主机器处于同一网段，这样虚拟系统才能和宿主机器进行通信。同时，由于这个虚拟系统是局域网中的一个独立的主机系统，那么就可以手工配置它的TCP/IP配置信息，以实现通过局域网的网关或路由器访问互联网。

使用bridged模式的虚拟系统和宿主机器的关系：就像连接在同一个Hub上的两台电脑。想让它们相互通讯，你就需要为虚拟系统配置IP地址和子网掩码，否则就无法通信。

虚拟系统与宿主计算机以及宿主计算机所在网络的其他计算机都可以相互访问。如果你想利用VMWare在局域网内新建一个虚拟服务器，为局域网用户提供网络服务，就应该选择桥接模式。

## NAT (网络地址转换模式)

这种模式下，虚拟系统的网卡连接到宿主计算机的VMware Network Adapter VMnet8网卡上（宿主计算机安装了VMWare软件后会自动添加VMware Network Adapter VMnet1和VMware Network Adapter VMnet8两个网卡）。如果你希望你的虚拟系统连接外部网络，这种模式最简单，虚拟系统不用做任何网络设置就可以访问外部网络。

使用NAT模式的虚拟系统和宿主计算机的关系：宿主计算机就相当于是开启了DHCP功能的路由器，虚拟系统就是内网中的一台实际的机器，通过路由器的DHCP服务获得网络参数。如果你想利用VMWare安装一个新的虚拟系统，在虚拟系统中不用进行任何手工配置就能直接访问互联网，建议你采用NAT模式。

虚拟系统可以访问宿主计算机所在网络的其他计算机（反之不行），可以与宿主计算机互访。

## Host-only (主机模式)

这种模式下，虚拟系统的网卡连接到宿主计算机的VMware Network Adapter VMnet1网卡上。默认情况下，虚拟系统只能与宿主计算机互访，这也是Host-only的名字的意义。此时相当于两台机器通过双绞线直连。

在host-only模式下，虚拟系统的TCP/IP配置信息(如IP地址、网关地址、DNS服务器等)，都是由VMnet1(host-only)虚拟网络的DHCP服务器来动态分配的。

如果你想利用VMWare创建一个与网内其他机器相隔离的虚拟系统，进行某些特殊的网络调试工作，可以选择Host-only模式。