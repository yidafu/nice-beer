# 部署

## 单仓库部署

设置两个分支：master 和 default。

master 分支用于方式博客 SPA 项目。

default 分支放置 markdown 格式的博客文档。

master 分支上通过 github action 来更新 context.json。

## 单独部署

博客文档放置到一个单独的仓库。

博客的 SPA 项目部署到服务器上。

通过 github 的 webhooks(或者 github action?) 触发。
