# 消息 (Message)

## 类型定义

### Message

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 消息 ID |
| channel | ?[Channel](./channel.md#channel) | 频道对象 |
| member | ?[Member](./member.md#guildmember) | 群组成员对象 |
| user | ?[User](./user.md#user) | 用户对象 |
| elements | array | 消息元素数组 |
| createdAt | number | 消息发送的时间戳 |
| updatedAt | number | 消息修改的时间戳 |

## API

### bot.sendMessage(channelId, content, guildId?)

- **channelId:** `string` 频道 ID
- **content:** `Fragment` 要发送的内容
- **guildId:** `string` 群组 ID
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定频道发送消息。

::: warning
只要你能够获取到会话对象，你就不应使用此 API，而应该使用 `session.send()`。一些平台会将主动发送的消息同被动接收后回复的消息区分开来，甚至可能限制主动消息的发送，因此使用 `session.send()` 总是有更好的可靠性。
:::

::: tip
`bot.sendMessage()` 既可以发送群聊消息，也可以发送私聊消息。当发送私聊消息时，其与 `bot.sendPrivateMessage()` 的区别在于前者传入的是频道 ID，而后者传入的是用户 ID。
:::

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
