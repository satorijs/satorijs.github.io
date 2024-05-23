# 用户 (User)

## 类型定义

### User

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 用户 ID |
| name | string? | 用户名称 |
| nick | string? | 用户昵称 |
| avatar | string? | 用户头像 |
| is_bot | boolean? | 是否为机器人 |

## API

### 获取用户信息

> <badge>POST</badge>`/user.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| user_id | string | 用户 ID |

获取用户信息。返回一个 [`User`](#user) 对象。

### 获取好友列表

> <badge>POST</badge>`/friend.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| next | string? | 分页令牌 |

获取好友列表。返回一个 [`User`](#user) 的 [分页列表](../protocol/api.md#list)。

### 处理好友申请

> <badge>POST</badge>`/friend.approve` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| message_id | string | 请求 ID |
| approve | boolean | 是否通过请求 |
| comment | string? | 备注信息 |

处理好友申请。

## 事件

### friend-request

接收到新的好友申请时触发。必需资源：`user`。
