# 用户 (User)

## 类型定义

### User

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 用户 ID |
| name | string | 用户名称 |
| avatar | ?string | 用户头像 |

## API

### bot.getSelf()

- 返回值: `Promise<User>` 用户信息

获取机器人自己的信息。

### bot.getUser(userId)

- **userId:** `string` 用户 ID
- 返回值: `Promise<User>` 用户信息

获取用户信息。

### bot.getFriendList(next?)

- **next:** `string` 分页令牌
- 返回值: `Promise<List<User>>` 好友列表

获取机器人的好友列表。

### bot.handleFriendRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理好友请求。