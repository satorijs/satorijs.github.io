# 通用功能

## 类型定义

### Self

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| user | [User](./user.md) | 用户对象 |
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

获取登录号自身的信息。
