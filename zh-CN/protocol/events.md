# 事件

Satori 协议规定了两套事件服务，分别基于 WebSocket 和 WebHook。你可以根据自己的需要进行选择。

## WebSocket

WebSocket 服务用于在 Satori 客户端与服务器之间维护一个持久的、有状态的链接。通过这个链接，Satori 客户端可以实时接收服务器推送的事件。

WebSocket 服务的地址为 `/{version}/events`。其中，`version` 为 API 的版本号。

目前 Satori 仅有 v1 一个版本。

### 生命周期

总的来说，Satori 的客户端需要在连接后遵循以下步骤：

1. 连接建立后，与服务端每隔 10s 发送一次 `heartbeat` 信令<br>服务端收到后会回复一个 `heartbeat` 信令
2. 连接建立后，在 10s 内发送一个 `identify` 信令，用于鉴权和恢复会话<br>服务端收到后会回复一个 `ready` 信令，并开启事件推送
3. 客户端持续接收来自服务端的 `dispatch` 信令，用于接收事件

信令的数据结构如下：

| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| `op` | string | 信令类型 |
| `body` | object | 信令数据 |

## WebHook

::: danger
这部分功能尚未完成。
:::
