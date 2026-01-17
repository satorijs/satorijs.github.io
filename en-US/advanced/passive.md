# Passive Requests <badge type="warning">Experimental</badge>

::: tip
Passive request capabilities are primarily provided through bots and triggered by users within chat applications. If the chat platform you are implementing or integrating does not support bot-related features, you can safely ignore this section.
:::

Operations performed by bots through API calls can be roughly divided into two categories:

- **Active operations**: Operations that can be performed without user interaction, such as scheduled message delivery;
- **Passive operations**: Operations performed in response to users, such as answering questions when a user mentions "@bot".

At the protocol level, both types of operations are expressed using the unified [`/message.create`](../resources/message.md#api-message-create) interface. However, some platforms may distinguish between these two types of operations and impose restrictions on active operations, such as:

- Rate limiting active message sending;
- Requiring the original event ID (or other context information) that triggered the API call to be included when sending response messages;
- Only allowing responses to an interaction within a specific time window.

In such cases, using the standard message sending interface alone cannot meet the parameter requirements for "passive requests". To address this, Satori provides an additional `referrer` field.

## `referrer` Field

::: tip
Note: The correct spelling is `referrer`, not `referer`.
:::

When the SDK pushes events, it can include an additional `event.referrer` field to carry the “source context” required by the platform for passive requests (such as the original event ID, callback token, thread information, etc.).

When implementing passive operations, the application side needs to pass the `referrer` from the source event as an API parameter as-is. This way, the SDK can clearly identify that this request is a passive operation and use the information in `referrer` to complete the platform API call.

The content of `referrer` is determined by the adapter, and the protocol does not impose strict constraints on its structure. In practice, it is recommended to only include useful information to avoid making the `referrer` field excessively long.

## Example (Lark)

Taking the Lark platform as an example: when receiving a message, the official adapter will deliver the following `referrer` field:

```json{11-21}
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
    // The fields here are defined internally by the Lark platform
    // and are unrelated to the Satori protocol
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

When the application replies to this message (i.e., a passive operation), it should pass this `referrer` as a parameter to [`/message.create`](../resources/message.md#api-message-create):

```json{4-14}
{
  "channel_id": "xxxxxxxx",
  "content": "reply to user message",
  "referrer": {
    // The fields here are defined internally by the Lark platform
    // and are unrelated to the Satori protocol
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
