---
layout: "../../layouts/BlogPost.astro"
title: "Git Remote"
description: "How to collaborate using Git"
pubDate: "Sep 16 2022"
tags:
  - Dev Basics
heroImage: "/blog/git-remote/git-remote.png"
---

# 概述

![Git](/blog/git-remote/01.png)

多人协作的工作模式通常是这样:

- 首先，可以试图用 `git push origin branch-name` 推送自己的修改;
- 如果推送失败，则因为远程分支比你的本地更新，需要先用 `git pull` 试图合并;
- 如果合并有冲突，则解决冲突，并在本地提交;
- 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功;
- 如果 `git pull` 提示 `"no tracking information"`，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name`

# 基本操作

## clone

```
git clone <版本库的网址> <本地目录名>
```

## remote

```
git remote          # 命令列出所有远程主机

git remote -v       # 参看远程主机的网址
origin  git@github.com:jquery/jquery.git (fetch)
origin  git@github.com:jquery/jquery.git (push)

git remote add <主机名> <网址>          # 用于添加远程主机
git remote rm <主机名>                  # 用于删除远程主机
git remote rename <原主机名> <新主机名>  # 用于远程主机的改名
```

## fetch

git fetch 会使你与另一仓库同步，提取你本地所没有的数据，为你在同步时的该远端的每一分支提供书签. 这些分支被叫做 "远端分支"，除了 Git 不允许你检出(切换到该分支)之外，跟本地分支没区别 —— 你可以将它们合并到当前分支，与其他分支作比较差异，查看那些分支的历史日志，等等.同步之后你就可以在本地操作这些。

```
git fetch <远程主机名>  # 将某个远程主机的更新，全部取回本地

git branch # 命令的 -r 选项，可以用来查看远程分支，-a 选项查看所有分支.
git branch -r

git branch -a
```

上面命令表示，本地主机的当前分支是 master，远程分支是 origin/master。

取回远程主机的更新以后，可以在它的基础上，使用 `git checkout` 命令创建一个新的分支。

```
git checkout -b newBrach origin/master
# 上面命令表示，在 origin/master 的基础上，创建一个新分支

# 此外，也可以使用 git merge 命令或者 git rebase 命令，在本地分支上合并远程分支
git merge origin/master
# 或者
git rebase origin/master
# 上面命令表示在当前分支上，合并 origin/master
```

## pull

基本上，该命令就是在 `git fetch`之后紧接着 `git merge`远端分支到你所在的任意分支。

```
git pull <远程主机名> <远程分支名>:<本地分支名> # 取回远程主机某个分支的更新，再与本地的指定分支合并.
git pull origin next:master             # 取回 origin 主机的 next 分支，与本地的 master 分支合并
```

### pull文件时和本地文件冲突

`git stash`先将本地修改存储起来 这样本地的所有修改就都被暂时存储起来 .是用 `git stash list`可以看到保存的信息：

```
stash@{0}: WIP on master: xxxxxxx <commit>
```

暂存了本地修改之后，就可以 `git pull` 了。

还原暂存的内容 `git stash pop stash@{0}` 提示如下信息：

```
Auto-merging c/environ.c
CONFLICT (content): Merge conflict in c/environ.c
```

意思就是系统自动合并修改的内容，但是其中有冲突，需要解决其中的冲突

也可以放弃本地修改，直接覆盖之

```
git reset --hard
git pull
```

## push

```
git push <远程主机名> <本地分支名>:<远程分支名> # 将本地分支的更新，推送到远程主机
git push origin master # 本地的 master 分支推送到 origin 主机的 master 分支.如果后者不存在，则会被新建.

# 如果远程主机的版本比本地版本更新，推送时 Git 会报错，要求先在本地做 git pull 合并差异，然后再推送到远程主机.这时，如果你一定要推送，可以使用 --force 选项.
git push --force origin
# 上面命令使用 --force 选项，结果导致远程主机上更新的版本被覆盖.除非你很确定要这样做，否则应该尽量避免使用 --force 选项.
```

## GitHub

![GitHub](/blog/git-remote/02.png)

### GitHub开启二次验证后，Git push验证权限失败

GitHub 开启二次验证后，提交时密码用个人设置里的 Personal Access Token，不是账号密码

### Git Push避免用户名和密码方法

在 windows 中添加一个用户变量，变量名:HOME,变量值:%USERPROFILE%

![System Environment Variables](/blog/git-remote/02.png)

进入 `%HOME%`目录，新建一个名为 `_netrc`的文件，文件中内容格式如下：

```
machine github.com
login your-usernmae
password Personal Access Token
```

### 压缩GitHub上的项目大小

下载工具：

[BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

将下载好的 jar 文件放在要压缩的项目同级文件夹下：

```
# 删除大于 1M 的文件
java -jar bfg.jar --strip-blobs-bigger-than 1M 1earn

# 删除所有的 mp4 文件
java -jar bfg.jar --delete-files *.mp4 1earn
```

BFG 将更新提交以及所有分支和标记，此时还没有物理删除。

进入文件夹，使用 `gc`

```
cd 1earn
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

确认无误后,可提交至远程仓库

```
git push
git push --force origin # 如果报错可以强行推送
```

### 重建版本库

```
rm -rf .git
git init
git add .
git cm "first commit"
git remote add origin <your_github_repo_url>
git push -f -u origin master
```

### GitHub进行fork后如何与原仓库同步

```
git remote -v               # 查看你的远程仓库的路径
# 如果只有上面2行，说明你未设置 upstream

git remote add upstream https://github.com/xxx/xxx.git  # 把 xxx 的仓库设置为你的 upstream
git remote -v               # 检查是否成功
git fetch upstream          # 抓取上游更新
git checkout master         # 切换到 master 分支
git merge upstream/master   # 合并远程的 master 分支
```

## Git Large File Storage

> Git Large File Storage (Git LFS) 是 Git 的开源扩展，使你能够像处理其他文本文件一样处理大文件。

### 安装

官方网站：

[Git Large File Storage](https://git-lfs.github.com/)

验证安装成功

```powershell
$ git lfs install
> Git LFS initialized.
```

### 配置

安装 [Git LFS] 后 (/articles/installing-git-large-file-storage/)，需要将其与仓库中的大文件相关联。

如果仓库中存在要用于 GitHub 的现有文件，则需要先从仓库中删除它们，然后在本地将其添加到 Git LFS。

```
# 将当前工作目录更改为要用于 Git LFS 的现有仓库。
cd 1earn

# 要将仓库中的文件类型与 Git LFS 相关联，请输入 git lfs track，后跟要自动上传到 Git LFS 的文件扩展名。
git lfs track "*.zip"
# 要与 Git LFS 关联的每个文件类型都需要添加 git lfs track。 此命令将修改仓库的 .gitattributes 文件，并将大文件与 Git LFS 相关联。

git commit -m "add file.zip"
git push

# 或推送所有引用的 Git LFS 文件
git lfs push --all origin
```

### 常见报错

**Error with socks5 proxy**

Git LFS 目前不支持 socks5 代理，换 http 代理：

```
git config --global http.proxy 'http://127.0.0.1:1080'
```

<style>
  ul {
	  list-style-type: disc;
  }
</style>