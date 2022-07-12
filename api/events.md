---
sidebarDepth: 2
---

# Events

## 通用会话事件

这里的会话事件都是通过 emit 方式在对应的上下文中触发的 (即上下文选择器对这些事件有效，且回调函数的返回值不会影响后续行为)。

### 消息类事件

跟消息有关的几种事件统称为消息类事件，共有以下几种：

- message: 收到新消息
- message-deleted: 消息被删除
- message-updated: 消息被修改
- send: 机器人发出消息

与此类事件相关的会话属性有：

- **messageId:** `string` 消息 ID
- **content:** `string` 消息内容
- **author:** 发送者信息
  - **author.userId:** `string` 发送者的平台 ID
  - **author.avatar:** `string` 发送者的头像链接
  - **author.username:** `string` 发送者的平台昵称
  - **author.nickname:** `string` 发送者在当前群组中的昵称
- **quote:** 引用的消息，同样包含 `messageId`, `content` 等属性

### 成员类事件

跟群组、好友有关的事件统称为成员类事件，共有以下几种：

- guild-added: 加入了群组
- guild-deleted: 退出了群组
- guild-request: 收到了群组邀请
- guild-member-added: 群组成员增加
- guild-member-deleted: 群组成员减少
- guild-member-request: 收到了入群申请
- friend-added: 好友数量增加
- friend-deleted: 好友数量减少
- friend-request: 收到了好友请求

形如 guild(-member)?-(added|deleted) 的事件拥有以下的属性：

- **operatorId:** `string` 操作者 ID

以 request 结尾的事件拥有下面的属性：

- **messageId:** `string` 请求 ID，可用于 [Bot](./bot.md#处理请求) 方法
- **content:** `string` 请求文本

### 操作类事件

上报事件中最主要的一部分都有着统一的结构：**事件主体** + **操作类型**。例如好友请求事件是 friend-request，群组文件更新事件是 guild-file-updated 等。目前支持的事件主体包括以下几种：

- friend
- channel
- guild
- guild-member
- guild-role
- guild-file
- guild-emoji

操作类型包含以下几种：

- added
- removed
- deleted

<!-- ### 群成员类事件

### 通知类事件

由系统在频道中发送的各种通知构成了通知类事件，共有以下几种：

- notice/poke: 戳一戳
- notice/lucky-king: 运气王
- notice/honor: 群荣誉

与此类事件相关的属性有：

- **targetId:** `string` 戳一戳的目标用户 ID，运气王的获得者 ID
- **honorType:** `string` 荣誉类型，可能为 talkative, performer, emotion -->

