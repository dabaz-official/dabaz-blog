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

在这种模式下