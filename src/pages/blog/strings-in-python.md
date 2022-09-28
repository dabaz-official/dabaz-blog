---
layout: "../../layouts/BlogPost.astro"
title: "Strings in Python"
description: "About encoding in Python"
pubDate: "Sep 13 2022"
heroImage: "/blog/strings-in-python/strings-in-python-hero.png"
---

搞清楚了令人头疼的字符编码问题后，我们再来研究Python的字符串。

在最新的Python 3版本中，字符串是以Unicode编码的，也就是说，Python的字符串支持多语言，例如：

```python
>>> print('包含中文的str')
包含中文的str
```

对于单个字符的编码，Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符：

```python
>>> ord('A')
65
>>> ord('中')
20013
>>> chr(66)
'B'
>>> chr(25991)
'文'
```