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
| `login` | [Login](../resources/login.md)? | 事件的登录信息 |
| `member` | [Member](../resources/member.md)? | 事件的目标成员 |
| `message` | [Message](../resources/message.md)? | 事件的消息 |
| `operator` | [User](../resources/user.md)? | 事件的操作者 |
| `role` | [Role](../resources/role.md)? | 事件的目标角色 |
| `user` | [User](../resources/user.md)? | 事件的目标用户 |

事件中的各属性遵循 [资源提升](./index.md) 的规则。

## WebSocket

WebSocket 服务用于在 Satori SDK 与应用之间维护一个持久的、有状态的链接。通过这个链接，Satori 应用可以实时接收 SDK 推送的事件。

WebSocket 服务的地址为 `/{version}/events`。其中，`version` 为 API 的版本号。

目前 Satori 仅有 v1 一个版本。

### 连接流程

总的来说，Satori 应用需要在连接后遵循以下步骤：

1. 连接建立后，在 10s 内发送一个 `IDENTIFY` 信令，用于鉴权和恢复会话；<br>SDK 收到后会回复一个 `READY` 信令，并开启事件推送；
1. 连接建立后，每隔 10s 向 SDK 发送一次 `PING` 信令；<br>SDK 收到后会回复一个 `PONG` 信令；
1. 应用持续接收来自 SDK 的 `EVENT` 信令，用于接收事件。

信令的数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `op` | number | 信令类型 |
| `body` | object? | 信令数据 |

信令类型如下：

| 名称 | 值 | 方向 | 描述 |
| --- | --- | --- | --- |
| EVENT | 0 | 接收 | 事件 |
| PING | 1 | 发送 | 心跳 |
| PONG | 2 | 接收 | 心跳回复 |
| IDENTIFY | 3 | 发送 | 鉴权 |
| READY | 4 | 接收 | 鉴权回复 |

`IDENTIFY` 信令的数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `token` | string? | 鉴权令牌 |
| `sequence` | number? | 序列号 |

`READY` 信令的数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `logins` | [`Login[]`](../resources/login.md) | 登录信息 |

`EVENT` 信令的数据结构参见 [Event](#event)。

### 会话恢复

当连接短暂中断时，Satori 应用可以通过 `IDENTIFY` 信令的 `sequence` 字段来恢复会话。`sequence` 字段的值为上一次连接中最后一个接收到的 `EVENT` 信令的 `id` 字段。会话恢复后，SDK 会向应用推送所有在断开连接期间发生的事件。

## WebHook

WebHook 服务是指，Satori SDK 在接收到平台事件时，向应用提供的 HTTP 地址推送事件。这些地址的配置方式由 SDK 自身决定，本协议不做任何限制。

事件推送以 POST 的形式进行，参数以 `application/json` 的形式编码在请求体中。数据结构参见 [Event](#event)。
