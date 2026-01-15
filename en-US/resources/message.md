# Message

## Definitions

### Message {#def-message}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `id` | string | message id |
| `content` | string | message content |
| `channel` | [Channel](./channel.md#def-channel)? | channel object |
| `guild` | [Guild](./guild.md#def-guild)? | guild object |
| `member` | [GuildMember](./member.md#def-guild-member)? | guild member object |
| `user` | [User](./user.md#def-user)? | user object |
| `created_at` | number? | timestamp of message creation |
| `updated_at` | number? | timestamp of message update |

## API

### Create Message {#api-message-create}

> <badge>POST</badge> `/message.create` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `content` | string | message content |

Send (create) a message. Returns an array of [Message](#def-message) objects.

### Get Message {#api-message-get}

> <badge>POST</badge> `/message.get` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |

Get a message by id. Returns a [Message](#def-message) object. Required resources: [`channel`](./channel.md#def-channel), [`user`](./user.md#def-user).

### Delete Message {#api-message-delete}

> <badge>POST</badge> `/message.delete` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |

Delete a specific message.

### Update Message {#api-message-update}

> <badge>POST</badge> `/message.update` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `content` | string | message content |

Edit (update) a specific message.

### Get Message List {#api-message-list}

> <badge>POST</badge> `/message.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `next` | string? | pagination token |
| `direction` | [Direction](../protocol/api.md#bidi-list)? | query direction |
| `limit` | number? | result limit |
| `order` | [Order](../protocol/api.md#bidi-list)? | result order |

Get the list of messages in a channel. Returns a [bidirectional paginated list](../protocol/api.md#bidi-list) of Message objects. Required resource: [`user`](./user.md#def-user).

- The `next` parameter defaults to null, indicating the query starts from the latest message. In this case, the `direction` parameter can only be `before`.
- The `direction` parameter defaults to `before`.
- The `order` parameter defaults to `asc` (regardless of query direction).
- The default value of the `limit` parameter aligns with the platform's default. If the platform API does not specify a default, it can be set independently, with a recommended value of 50. If the user-provided value exceeds the platform's limit, the platform's upper limit should be used instead of returning an error. Developers should use the presence of `prev` or `next` in the response to determine if more data exists, rather than relying on the length of the `data` in the response.

## Events

### message-created

Triggered when a message is created. Required resources: [`channel`](./channel.md#def-channel), [`message`](#def-message), [`user`](./user.md#def-user).

### message-updated

Triggered when a message is updated. Required resources: [`channel`](./channel.md#def-channel), [`message`](#def-message), [`user`](./user.md#def-user).

### message-deleted

Triggered when a message is deleted. Required resources: [`channel`](./channel.md#def-channel), [`message`](#def-message), [`user`](./user.md#def-user).
