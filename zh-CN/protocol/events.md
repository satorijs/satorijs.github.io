# 事件

Satori 协议规定了两套事件服务，分别基于 WebSocket 和 WebHook。你可以根据自己的需要进行选择。

## 类型定义

### Event

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `id` | number | 事件 ID |
| `type` | string | 事件类型 |
| `platform` | string | 接收者的平台名称 |
| `self_id` | string | 接收者的平台账号 |
| `timestamp` | number | 事件的时间戳 |
| `channel` | [Channel](../resources/channel.md)? | 事件所属的频道 |
| `guild` | [Guild](../resources/guild.md)? | 事件所属的群组 |
| `member` | [Member](../resources/member.md)? | 事件的目标成员 |
| `message` | [Message](../resources/message.md)? | 事件的消息 |
| `operator` | [User](../resources/user.md)? | 事件的操作者 |
| `role` | [Role](../resources/role.md)? | 事件的目标角色 |
| `user` | [User](../resources/user.md)? | 事件的目标用户 |

事件中的各属性遵循 [资源提升](./index.md) 的规则。

## WebSocket

WebSocket 服务用于在 Satori 客户端与服务器之间维护一个持久的、有状态的链接。通过这个链接，Satori 客户端可以实时接收服务器推送的事件。

WebSocket 服务的地址为 `/{version}/events`。其中，`version` 为 API 的版本号。

目前 Satori 仅有 v1 一个版本。

### 生命周期

总的来说，Satori 的客户端需要在连接后遵循以下步骤：

1. 连接建立后，在 10s 内发送一个 `IDENTIFY` 信令，用于鉴权和恢复会话；<br>服务端收到后会回复一个 `READY` 信令，并开启事件推送；
1. 连接建立后，与服务端每隔 10s 发送一次 `PING` 信令；<br>服务端收到后会回复一个 `PONG` 信令；
1. 客户端持续接收来自服务端的 `EVENT` 信令，用于接收事件。

信令的数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `op` | number | 信令类型 |
| `body` | object | 信令数据 |

信令类型如下：

| 名称 | 值 | 描述 |
| --- | --- | --- |
| EVENT | 0 | 事件 |
| PING | 1 | 心跳 |
| PONG | 2 | 心跳回复 |
| IDENTIFY | 3 | 鉴权 |
| READY | 4 | 鉴权回复 |

## WebHook

::: danger
这部分功能尚未完成。
:::
