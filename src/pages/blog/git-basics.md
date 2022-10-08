---
layout: "../../layouts/BlogPost.astro"
title: "Git Basics"
description: "The basics of Git"
pubDate: "Sep 15 2022"
tags:
  - Dev Basics
heroImage: "/blog/git-basics/git-basics.png"
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

### 丢弃提交

如果希望以前的提交在历史中彻底消失，而不是被抵消掉，可以使用 `git reset` 命令，丢弃掉某个提交之后的所有提交。

```
git reset [last good SHA]
```

`git reset` 的原理是，让最新提交的指针回到以前某个时点，该时点之后的提交都从历史中消失。

默认情况下，`git reset` 不改变工作区的文件（但会改变暂存区），`--hard` 参数可以让工作区里面的文件也回到以前的状态。

```
git reset --hard [last good SHA]
```

执行 `git reset` 命令之后，如果想找回那些丢弃掉的提交，可以使用 `git reflog` 命令，具体做法参考这里。不过，这种做法有时效性，时间长了可能找不回来。

### **替换上一次提交**

提交以后，发现提交信息写错了，这时可以使用 `git commit` 命令的 `--amend` 参数，可以修改上一次的提交信息。

```
git commit --amend -m "Fixes bug #42"
```

它的原理是产生一个新的提交对象，替换掉上一次提交产生的提交对象。

这时如果暂存区有发生变化的文件，会一起提交到仓库。所以，`--amend` 不仅可以修改提交信息，还可以整个把上一次提交替换掉。

### 修改上一次的commit

```
git commit --amend
```

### 撤销工作区的文件修改

如果工作区的某个文件被改乱了，但还没有提交，可以用 `git checkout` 命令找回本次修改之前的文件。

```
git checkout -- [filename]
```

它的原理是先找暂存区，如果该文件有暂存的版本，则恢复该版本，否则恢复上一次提交的版本。

注意，工作区的文件变化一旦被撤销，就无法找回了。

### 从暂存区撤销文件

如果不小心把一个文件添加到暂存区，可以用下面的命令撤销。

```
git rm --cached [filename]
```

上面的命令不影响已经提交的内容。

### 撤销当前分支的变化

你在当前分支上做了几次提交，突然发现放错了分支，这几个提交本应该放到另一个分支。

```
# 新建一个 feature 分支，指向当前最新的提交
# 注意，这时依然停留在当前分支
git branch feature

# 切换到这几次提交之前的状态
git reset --hard [当前分支此前的最后一次提交]

# 切换到 feature 分支
git checkout feature
```

上面的操作等于是撤销当前分支的变化，将这些变化放到一个新建的分支。

## 跳转

```
git log # 查看 commit 历史

git checkout xxxxxxxx # 跳转到指定的 commit 版本中
```

## 子模块

有种情况经常会遇到：某个工作中的项目需要包含并使用另一个项目。也许是第三方库，或者你独立开发的，用于多个父项目的库。

现在问题来了：你想要把它们当做两个独立的项目，同时又想在一个项目中使用另一个。

假设你正在开发一个网站然后创建了 Atom 订阅。 你决定使用一个库，而不是写自己的 Atom 生成代码。你可能不得不通过 CPAN 安装或 Ruby gem 来包含共享库中的代码，或者将源代码直接拷贝到自己的项目中。如果将这个库包含进来，那么无论用何种方式都很难定制它，部署则更加困难，因为你必须确保每一个客户端都包含该库。 如果将代码复制到自己的项目中，那么你做的任何自定义修改都会使合并上游的改动变得困难。

Git 通过子模块来解决这个问题。子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

```
git submodule add https://github.com/No-Github/1earn # 添加一个名为 1earn 的库

# 默认情况下，子模块会将子项目放到一个与仓库同名的目录中，本例中是 1earn , 如果你想要放到其他地方，那么可以在命令结尾添加一个不同的路径。
```

运行 git status

```
git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   .gitmodules
        new file:   1earn
```

首先应当注意到新的 .gitmodules 文件。 该配置文件保存了项目 URL 与已经拉取的本地目录之间的映射：

```
[submodule "1earn"]
	path = 1earn
	url = https://github.com/No-Github/1earn
```

如果有多个子模块，该文件中就会有多条记录。 要重点注意的是，该文件也像 .gitignore 文件一样受到（通过）版本控制。 它会和该项目的其他部分一同被拉取推送。 这就是克隆该项目的人知道去哪获得子模块的原因。

当你提交时，会看到类似下面的信息：

```
git commit -m "test add module"
[master e214ed0] test add module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 1earn
# 注意 1earn 记录的 160000 模式。 这是 Git 中的一种特殊模式，它本质上意味着你是将一次提交记作一项目录记录的，而非将它记录成一个子目录或者一个文件。
```

最后，推送这些更改：

```
git push origin master
```

## 大小写

git 默认对于文件名大小写是不敏感的,所以你修改了首字母大写,但是 git 并没有发现代码任何改动。

可以配置 git 使其对文件名大小写敏感：

```
git config core.ignorecase false
```

<style>
  ul {
	  list-style-type: disc;
  }
</style>