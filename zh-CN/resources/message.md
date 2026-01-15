# 消息 (Message)

## 类型定义

### Message {#def-message}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `id` | string | 消息 ID |
| `content` | string | 消息内容 |
| `channel` | [Channel](./channel.md#def-channel)? | 频道对象 |
| `guild` | [Guild](./guild.md#def-guild)? | 群组对象 |
| `member` | [Member](./member.md#def-member)? | 群组成员对象 |
| `user` | [User](./user.md#def-user)? | 用户对象 |
| `created_at` | number? | 消息发送的时间戳 |
| `updated_at` | number? | 消息修改的时间戳 |

## API

### 发送消息 {#api-message-create}

> <badge>POST</badge> `/message.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `channel_id` | string | 频道 ID |
| `content` | string | 消息内容 |

发送消息。返回一个 [`Message`](#def-message) 对象构成的数组。

### 获取消息 {#api-message-get}

> <badge>POST</badge> `/message.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `channel_id` | string | 频道 ID |
| `message_id` | string | 消息 ID |

获取特定消息。返回一个 [`Message`](#def-message) 对象。必需资源：[`channel`](./channel.md#def-channel)，[`user`](./user.md#def-user)。

### 撤回消息 {#api-message-delete}

> <badge>POST</badge> `/message.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `channel_id` | string | 频道 ID |
| `message_id` | string | 消息 ID |

撤回特定消息。

### 编辑消息 {#api-message-update}

> <badge>POST</badge> `/message.update` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `channel_id` | string | 频道 ID |
| `message_id` | string | 消息 ID |
| `content` | string | 消息内容 |

编辑特定消息。

### 获取消息列表 {#api-message-list}

> <badge>POST</badge> `/message.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `channel_id` | string | 频道 ID |
| `next` | string? | 分页令牌 |
| `direction` | [Direction](../protocol/api.md#bidi-list)? | 查询方向 |
| `limit` | number? | 消息数量限制 |
| `order` | [Order](../protocol/api.md#bidi-list)? | 对结果排序 |

获取频道消息列表。返回一个 [`Message`](#def-message) 的 [双向分页列表](../protocol/api.md#bidi-list)。必需资源：[`user`](./user.md#def-user)。

- `next` 参数默认值为空，表示从最新消息开始查询。此时 `direction` 参数只能为 `before`。
- `direction` 参数默认为 `before`。
- `order` 参数默认为 `asc` (无论查询方向)。
- `limit` 参数的默认值与平台默认值保持一致。如果平台 API 没有设定默认值，则可以自行设定，推荐值为 50。如果用户传入值超出平台要求的上限，则应当改为使用平台的上限值，而不是返回错误。开发者应当使用返回值中 `prev` 或 `next` 的存在性判断是否有更多数据，而非依赖于返回值中 `data` 的长度。

## 事件

### message-created

当消息被创建时触发。必需资源：[`channel`](./channel.md#def-channel)，[`message`](#def-message)，[`user`](./user.md#def-user)。

### message-updated

当消息被编辑时触发。必需资源：[`channel`](./channel.md#def-channel)，[`message`](#def-message)，[`user`](./user.md#def-user)。

### message-deleted

当消息被删除时触发。必需资源：[`channel`](./channel.md#def-channel)，[`message`](#def-message)，[`user`](./user.md#def-user)。
