# Events

The Satori protocol defines two sets of event services, based on WebSocket and WebHook, respectively.

## Definitions

### Opcode

| NAME | VALUE | DIRECTION | DESCRIPTION |
| --- | --- | --- | --- |
| EVENT | 0 | Receive | Event |
| PING | 1 | Send | Heartbeat |
| PONG | 2 | Receive | Heartbeat Response |
| IDENTIFY | 3 | Send | Authentication |
| READY | 4 | Receive | Authentication Success |
| META | 5 | Receive | Metadata Update <badge type="warning">experimental</badge> |

### Event

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| sn | number | sequence number |
| type | string | event type |
| timestamp | number | event timestamp |
| login | [Login](../resources/login.md#def-login) | login object |
| argv | [Argv](../resources/interaction.md#def-argv)? | argv object |
| button | [Button](../resources/interaction.md#def-button)? | button object |
| channel | [Channel](../resources/channel.md#def-channel)? | channel object |
| guild | [Guild](../resources/guild.md#def-guild)? | guild object |
| member | [GuildMember](../resources/member.md#def-guild-member)? | guild member object |
| message | [Message](../resources/message.md#def-message)? | message object |
| operator | [User](../resources/user.md#def-user)? | operator user object |
| role | [GuildRole](../resources/role.md#def-guild-role)? | guild role object |
| user | [User](../resources/user.md#def-user)? | user object |

Events are divided into login events and non-login events. Login events specifically refer to events related to [Login](../resources/login.md) changes (e.g., [login-added](../resources/login.md#login-added)). All events use the above data structure, but there are some differences in details:

- The `login` resource in non-login events will only have the `sn`, `user`, and `platform` attributes.
- Non-login events ensure that `login.status` is `ONLINE` (though this field is not passed).
- Login events will have the complete `login` resource but may lack `user` and `platform`.
- Login events do not participate in [session recovery](#session-recovery).

The attributes in events follow the resource promotion rules.

## WebSocket

The WebSocket service is used to maintain a persistent, stateful connection between the Satori SDK and the application. Through this connection, Satori applications can receive events pushed by the SDK in real time.

The WebSocket service address is `/{path}/{version}/events`. Here, `path` is the deployment path (which can be empty), and `version` is the API version number.

Currently, Satori has only one version: v1.

### Connection Process

In general, Satori applications need to follow these steps after establishing a connection:

1. After the connection is established, send an `IDENTIFY` signal within 10 seconds for authentication and session recovery.<br>The SDK will reply with a `READY` signal and start event推送.
1. After the connection is established, send a `PING` signal to the SDK every 10 seconds.<br>The SDK will reply with a `PONG` signal.
1. The application continuously receives `EVENT` signals from the SDK to receive events.

The signal data structure is as follows:

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| op | [Opcode](#opcode) | signal type |
| body | object? | signal data |

The `body` data structure for the `IDENTIFY` signal is as follows:

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| token | string? | authentication token |
| sn | number? | sequence number |

The `body` data structure for the `READY` signal is as follows:

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| logins | [Login](../resources/login.md#def-login)[] | login objects |
| proxy_urls | string[] | list of [Proxy Routes](../advanced/resource.md#proxy-route) |

The `body` data structure for the `META` signal is as follows:

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| proxy_urls | string[] | list of [Proxy Routes](../advanced/resource.md#proxy-route) |

The `body` data structure for the `EVENT` signal is described in [Event](#event).

### Authentication

WebSocket authentication is implemented through the `token` field in the `IDENTIFY` signal. The authentication tokens involved are distributed by the SDK, and this protocol imposes no restrictions on them.

If the SDK is not configured for authentication, the application does not need to provide the above field.

### Session Recovery {#session-recovery}

When a connection is briefly interrupted, Satori applications can recover the session using the `sn` field in the `IDENTIFY` signal. The `sn` field value is the `sn` field of the last `EVENT` signal received in the previous connection. After session recovery, the SDK will push all events that occurred during the disconnection to the application.

Login events will not be pushed during session recovery, as the latest login status is already included in the READY signal.

## WebHook <badge>optional</badge> <badge type="warning">experimental</badge>

::: tip
This is an optional feature.
:::

The WebHook service refers to the SDK pushing events to an HTTP address provided by the application when receiving platform events. An SDK should be able to configure multiple WebHooks and allow the application to authenticate the sender. The configuration of these WebHooks is determined by the SDK itself. This protocol only standardizes a set of [APIs](../advanced/meta.md#api) and does not impose mandatory requirements.

Event pushes are performed via POST requests. The request header includes the `Satori-Opcode` field, corresponding to the [signal type](#opcode) of this push. The request body is a JSON object, corresponding to the signal data of this push. For example, an event push will have a `Satori-Opcode: 0` request header and a request body that conforms to the [Event](#event) structure.

The signals involved in WebHook include only `EVENT` and `META`.

When the application receives a WebHook request, it should return a 2XX status code if it can successfully authenticate and process the request. If authentication fails, it should return a 4XX status code. If processing fails, it should return a 5XX status code.

### Reverse Authentication

::: tip
The authentication logic here is similar to that in API and WebSocket but in the opposite direction.
:::

Satori applications can require the SDK to include an `Authorization` request header when sending WebHook requests, formatted as `Bearer {token}`. Here, `token` is distributed by the application.
