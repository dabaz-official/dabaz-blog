---
layout: "../../layouts/BlogPost.astro"
title: "Git Basics"
description: "The basics of Git"
pubDate: "Sep 15 2022"
tags:
  - Dev Basics
heroImage: "/blog/git-intro/git-intro.png"
---

# 概述

```shell
git config --global user.name "username"
git config --global user.email user@aaa.com
# 如果使用了 -global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情，Git 都会使用那些信息.当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 -global 选项的命令来配置.

git config --global http.proxy                              # 查看当前代理设置
git config --global http.proxy 'socks5://127.0.0.1:1080'    # 设置当前代理
git config --global https.proxy 'socks5://127.0.0.1:1080'   # 设置当前代理
git config --global --unset https.proxy                     # 删除 proxy

git init                    # 初始化仓库
git config --list           # 检查配置信息
git config user.name        # 查看用户名
git config user.email       # 查看邮箱

git status                  # 查看状态
git diff                    # 查看已暂存和未暂存的修改
git diff --cached           # 查看暂存区和本地仓库之间的差异

git log                     # 查看提交历史
git reflog                  # 显示当前分支的最近几次提交

git commit -m "Input your commit message"       # 提交更新
git commit -a -m "Commit message"               # 跳过使用暂存区
git commit --allow-empty-message --no-edit      # 懒得什么 message 都不想写

git commit -m 'test1
test2
test3
'                           # 提交多行 massage

git rm <finame>
git mv file_from file_to

已修改，未暂存
# 如果我们只是在编辑器里修改了文件，但还没有执行 git add .，这时候我们的文件还在工作区，并没有进入暂存区，我们可以用
git checkout -- test.txt  # git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以 "一键还原".
git reset HEAD file         # 把暂存区的修改撤销掉(unstage)，重新放回工作区

已暂存，未提交
# 你已经执行了 git add .，但还没有执行 git commit -m "comment".这时候你意识到了错误，想要撤销，你可以执行:
git reset
git checkout .

已提交，未推送
# 你的手太快，你既执行了 git add .，又执行了 git commit，这时候你的代码已经进入了你的本地仓库，然而你后悔了，怎么办？不要着急，还有办法.
git reset --hard origin/master
# 还是这个 git reset --hard 命令，只不过这次多了一个参数 origin/master，正如我们上面讲过的，origin/master 代表远程仓库，既然你已经污染了你的本地仓库，那么就从远程仓库把代码取回来吧.

已推送
# 很不幸，你的手实在是太快了，你既 git add 了，又 git commit 了，并且还 git push 了，这时你的代码已经进入远程仓库.如果你想恢复的话，还好，由于你的本地仓库和远程仓库是等价的，你只需要先恢复本地仓库，再强制 push 到远程仓库就好了:
git reset --hard HEAD^
git push -f
```

# 基本操作

## 分支管理

![branches](/blog/git-basics/01.png)

```shell
git branch                  # 查看分支
git branch -r               # 查看远程分支
git branch -a               # 查看所有分支
git branch <name>           # 创建分支
git checkout <name>         # 切换分支
git checkout -b <name>      # 创建 + 切换分支
git merge <name>            # 合并某分支到当前分支
git branch -d <name>        # 删除分支

git stash                   # 储藏分支
git stash list
git stash pop               # 恢复的同时把 stash 内容也删了
```

## 标签管理

```shell
# 注意，标签不是按时间顺序列出，而是按字母排序的.可以用 git show <tagname> 查看标签信息

git tag <name> # 用于新建一个标签，默认为 HEAD，也可以指定一个 commit id;
git tag -a <tagname> -m "blablabla..." # 可以指定标签信息;
git tag -s <tagname> -m "blablabla..." # 可以用 PGP 签名标签;
git tag # 可以查看所有标签;
git push origin <tagname> # 可以推送一个本地标签;
git push origin --tags # 可以推送全部未推送过的本地标签;
git tag -d <tagname> # 可以删除一个本地标签;
git push origin :refs/tags/<tagname> # 可以删除一个远程标签.
```

## 忽略文件

一个名为`.gitignore`的文件，列出要忽略的文件模式。配置语法：

```shell
# 以斜杠 "/" 开头表示目录;
# 以星号 "*" 通配多个字符;
# 以问号 "?" 通配单个字符
# 以方括号 "[]" 包含单个字符的匹配列表;
# 以叹号 "!" 表示不忽略(跟踪)匹配到的文件或目录;

/*
!.gitignore
!/fw/bin/
!/fw/sf/
说明:忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录;
```

此外，git 对于`.ignore`配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效。

## 别名

```shell
# 以下2条都是对 git lg 的 alias
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --"

git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'"
```

## 撤销

### 撤销提交

一种常见的场景是，提交代码以后，你突然意识到这个提交有问题，应该撤销掉，这时执行下面的命令就可以了。

```
git revert HEAD
```

上面命令的原理是，在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化。它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险。

`git revert` 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行依次指定这些提交。比如，抵消前两个提交，要像下面这样写。

```
git revert [倒数第一个提交] [倒数第二个提交]
```

git revert 命令还有两个参数。

```
--no-edit   # 执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
--no-commit # 只抵消暂存区和工作区的文件变化，不产生新的提交。
```


<style>
  ul {
	  list-style-type: disc;
  }
</style>