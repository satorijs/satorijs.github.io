# 通用功能

## 类型定义

### Login

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| user | [User](./user.md)? | 用户对象 |
| status | [Status](#status) | 在线状态 |

### Status

| 名称 | 值 | 描述 |
| --- | --- | --- |
| OFFLINE | 0 | 离线 |
| ONLINE | 1 | 在线 |
| CONNECT | 2 | 连接中 |
| DISCONNECT | 3 | 断开连接 |
| RECONNECT | 4 | 重新连接 |

## API

### 获取自身信息

> <badge>POST</badge>`/self.get` {.route}

获取登录号自身的信息。返回一个 [`Login`](#login) 对象。

### 获取方法列表

> <badge>POST</badge>`/method.list` {.route}

获取当前可以调用的方法列表。返回一个 `string` 数组。

## 事件

### login-updated

自身信息更新时触发。