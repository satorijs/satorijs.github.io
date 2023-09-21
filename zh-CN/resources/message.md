# 消息 (Message)

## 类型定义

### Message

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 消息 ID |
| channel | ?[Channel](./channel.md#channel) | 频道对象 |
| guild | ?[Guild](./guild.md#guild) | 群组对象 |
| member | ?[Member](./member.md#guildmember) | 群组成员对象 |
| user | ?[User](./user.md#user) | 用户对象 |
| content | string | 消息内容 |
| createdAt | number? | 消息发送的时间戳 |
| updatedAt | number? | 消息修改的时间戳 |

## API

### bot.sendMessage(channelId, content, guildId?)

- **channelId:** `string` 频道 ID
- **content:** `Fragment` 要发送的内容
- **guildId:** `string` 群组 ID
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定频道发送消息。

### bot.sendPrivateMessage(userId, content)

- **userId:** `string` 对方 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定用户发送私聊消息。

### bot.getMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<Message>`

获取特定消息。

### bot.deleteMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<void>`

撤回特定消息。

### bot.editMessage(channelId, messageId, content)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<void>`

修改特定消息。

### bot.getMessageList(channelId, next?)

- **channelId:** `string` 频道 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<Message>>` 消息列表

获取频道消息列表。

## 事件

### message-created

当消息被创建时触发。包含一个 [Message](#message) 对象。

### message-updated

当消息被编辑时触发。包含一个 [Message](#message) 对象。

### message-deleted

当消息被删除时触发。包含一个 [Message](#message) 对象，部分属性可能缺失。
