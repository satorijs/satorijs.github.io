# 消息 (Message)

## 类型定义

### Message

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 消息 ID |
| content | string | 消息内容 |
| channel | [Channel](./channel.md#channel)? | 频道对象 |
| guild | [Guild](./guild.md#guild)? | 群组对象 |
| member | [Member](./member.md#member)? | 成员对象 |
| user | [User](./user.md#user)? | 用户对象 |
| created_at | number? | 消息发送的时间戳 |
| updated_at | number? | 消息修改的时间戳 |

## API

### 发送消息

> <badge>POST</badge>`/message.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| content | string | 消息内容 |

发送消息。返回一个 [`Message`](#message) 对象构成的数组。

### 获取消息

> <badge>POST</badge>`/message.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |

获取特定消息。返回一个 [`Message`](#message) 对象。必需资源：`channel`，`user`。

### 撤回消息

> <badge>POST</badge>`/message.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |

撤回特定消息。

### 编辑消息

> <badge>POST</badge>`/message.update` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |
| content | string | 消息内容 |

编辑特定消息。

### 获取消息列表

> <badge>POST</badge>`/message.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| next | string? | 分页令牌 |

获取频道消息列表。返回一个 [`Message`](#message) 的 [分页列表](../protocol/api.md#分页)。必需资源：`channel`，`user`。

## 事件

### message-created

当消息被创建时触发。必需资源：`channel`，`message`，`user`。

### message-updated

当消息被编辑时触发。必需资源：`channel`，`message`，`user`。

### message-deleted

当消息被删除时触发。必需资源：`channel`，`message`，`user`。
