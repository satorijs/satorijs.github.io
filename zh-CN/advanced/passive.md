# 被动请求 <badge type="warning">实验性</badge>

::: tip
被动请求能力主要通过机器人提供，并由用户在聊天应用中触发。如果你要实现或接入的聊天平台不支持机器人相关功能，那么可以直接忽略本节。
:::

聊天机器人调用 API 进行的操作可以粗略分为两类：

- **主动操作**：不依赖用户交互就能进行的操作，例如定时推送消息；
- **被动操作**：以响应用户为目的而进行的操作，例如回答用户“@机器人”的问题。

在协议侧，上述两种操作都使用统一的 [`/message.create`](../resources/message.md#api-message-create) 接口表达。然而，部分平台可能会区分上述两类操作，并对主动操作进行限制，例如：

- 限制主动发送消息的速率；
- 强制要求在回传消息时携带触发 API 调用的原始事件 ID (或其他上下文信息)；
- 仅允许在特定时间窗口内对某次交互进行回应。

在这种情况下，仅仅使用标准的发送消息接口就无法满足“被动请求”所需的参数要求。为此，Satori 提供了额外的 `referrer` 字段来解决问题。

## referrer 字段

::: tip
注意：正确的拼写是 `referrer` 而不是 `referer`。
:::

当 SDK 推送事件时，可以额外携带一个 `event.referrer` 字段，用于承载平台进行被动请求所需的“来源信息” (例如原始事件 ID、回调 token、thread 信息等)。

应用侧在实现被动操作时，需要将来源事件的 `referrer` 原样作为 API 参数传入。这样一来，SDK 就可以明确知道此次请求属于被动操作，并利用 `referrer` 中的信息完成平台 API 调用。

`referrer` 的内容由适配器决定，协议不对其结构做强约束。在实践上，建议仅仅下发有用的信息，避免 `referrer` 字段过于冗长。

## 示例 (Lark)

以 Lark 平台为例：在接收到消息时，官方适配器会下发以下 `referrer` 字段：

```json{11-20}
{
  "sn": 0,
  "type": "message-created",
  "channel": {
    "id": "xxxxxxxx"
  },
  "message": {
    "id": "xxxxxxxx",
    "content": "user message"
  },
  "referrer": {
    // 这里的字段都是 Lark 平台内部定义的，与 Satori 协议无关
    "type": "im.message.receive_v1",
    "event": {
      "message": {
        "message_id": "xxxxxxxx",
        "thread_id": "xxxxxxxx"
      }
    }
  }
}
```

应用在回复该消息 (即被动操作) 时，应当将该 `referrer` 作为参数传入 `/message.create`：

```json{4-13}
{
  "channel_id": "xxxxxxxx",
  "content": "reply to user message",
  "referrer": {
    // 这里的字段都是 Lark 平台内部定义的，与 Satori 协议无关
    "type": "im.message.receive_v1",
    "event": {
      "message": {
        "message_id": "xxxxxxxx",
        "thread_id": "xxxxxxxx"
      }
    }
  }
}
```
