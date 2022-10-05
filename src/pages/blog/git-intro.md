---
layout: "../../layouts/BlogPost.astro"
title: "Git Intro"
description: "The introduction of Git"
pubDate: "Sep 14 2022"
tags:
  - Dev Basics
heroImage: "/blog/git-intro/git-intro.png"
---

![Git](/blog/git-intro/01.png)

# 工作区 (Working Directory)

在电脑里能看到的目录。

# 版本库 (Repository)

在电脑里能看到的目录。

工作区有一个隐藏目录 .git，这个不算工作区，而是 Git 的版本库。

Git 的版本库里存了很多东西，其中最重要的就是称为 stage (或者叫 index)的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD。

把文件往 Git 版本库里添加的时候，是分两步执行的:

- 第一步是用 git add 把文件添加进去，实际上就是把文件修改添加到暂存区。

- 第二步是用 git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建 Git 版本库时，Git 自动为我们创建了唯一一个 master 分支。所以，现在git commit 就是往 master 分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区。然后，一次性提交暂存区的所有修改。

# .git目录

结构展开类似：

```
.git
├── HEAD
├── branches
├── config
├── description
├── hooks
│   ├── pre-commit.sample
│   ├── pre-push.sample
│   └── ...
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags
```

## config

config 文件中包含着 repository 的配置，包括 remote 的地址，提交时的 email, username 等等，所有通过 git config 来设置的内容都在这里保存着。如果熟悉甚至可以直接修改该文件。

## description

被 GitWeb (GitHub 之前) 用来描述 repository 内容。

## hooks

hooks，国内通常被翻译成钩子，git 中一个比较有趣的功能。可以编写一些脚本让 git 在各个阶段自动执行。这些脚本被称为 hooks, 脚本可以在 commit/rebase/pull 等等环节前后被执行。脚本的名字暗示了脚本被执行的时刻。一个比较常见的使用场景就是在 pre-push 阶段检查本地提交是否遵循了 remote 仓库的代码风格。

## info/exclude

该文件中定义的文件不会被 git 追踪，和 .gitignore 作用相同。大部分情况下 .gitignore 就足够了，但知道 info/exclude 文件的存在也是可以的。

## objects

每一次创建一些文件，提交，git 都会压缩并将其保存到自己的数据结构中。压缩的内容会拥有一个唯一的名字，一个 hash 值，该 hash 值会保存到 object 目录中。

## HEAD

HEAD 可以比喻成一个指针，指向当前工作的分支。

<style>
  ul {
	  list-style-type: disc;
  }
</style>