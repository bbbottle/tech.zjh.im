---
title: tech.zjh.im 持续部署
date: 2021/07/13
author: zjh
description: 利用 github action 持续部署 tech.zjh.im 变更到 VPS 上。
tags: cd, github action
type: post
---

# tech.zjh.im 持续部署

该过程本质上是利用 [ssh-action](https://github.com/appleboy/ssh-action)，远程连到 VPS 并执行相应的命令。

### VPS 前提：
1. [新增 SSH 密钥到 Github 账户](https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
2. 拉取 tech.zjh.im 仓库，并安装好依赖
3. Nginx 已经配置好静态文件服务
4. tech.zjh.im 仓库内容更新后，只要重新构建更新 dist 目录，站点便更新

### VPS 配置步骤
1. `cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys`
2. 复制命令 `cat ~/.ssh/id_ed25519` 的输出

### 仓库配置
#### 添加以下 secrets:
1. SSHKEY, 上个步骤复制的内容
2. HOST, 填 VPS ip 地址 
3. USERNAME, 使用 ssh 登陆的用户名
4. PORT, 端口，默认填 22

#### 添加 deploy.yml
- [deploy.yml](https://github.com/bbbottle/tech.zjh.im/blob/master/.github/workflows/deploy.yml)
- script 请根据实际需要修改


___
<cite><a href="https://github.com/appleboy/ssh-action">How to setup continuous deployment of a website on a VPS using GitHub Actions</a></cite>
