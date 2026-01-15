# 事件

Satori 协议规定了两套事件服务，分别基于 WebSocket 和 WebHook。

## 类型定义

### Opcode

| 名称 | 值 | 方向 | 描述 |
| --- | --- | --- | --- |
| `EVENT` | 0 | 接收 | 事件 |
| `PING` | 1 | 发送 | 心跳 |
| `PONG` | 2 | 接收 | 心跳回复 |
| `IDENTIFY` | 3 | 发送 | 鉴权 |
| `READY` | 4 | 接收 | 鉴权成功 |
| `META` | 5 | 接收 | 元信息更新 <badge type="warning">实验性</badge> |

### Event

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `sn` | number | 序列号 |
| `type` | string | 事件类型 |
| `timestamp` | number | 事件的时间戳 |
| `login` | [Login](../resources/login.md#def-login) | 登录信息 |
| `argv` | [Argv](../resources/interaction.md#def-argv)? | 交互指令 |
| `button` | [Button](../resources/interaction.md#def-button)? | 交互按钮 |
| `channel` | [Channel](../resources/channel.md#def-channel)? | 事件所属的频道 |
| `guild` | [Guild](../resources/guild.md#def-guild)? | 事件所属的群组 |
| `member` | [GuildMember](../resources/member.md#def-guild-member)? | 事件的目标成员 |
| `message` | [Message](../resources/message.md#def-message)? | 事件的消息 |
| `operator` | [User](../resources/user.md#def-user)? | 事件的操作者 |
| `role` | [GuildRole](../resources/role.md#def-guild-role)? | 事件的目标角色 |
| `user` | [User](../resources/user.md#def-user)? | 事件的目标用户 |
| `referrer` | object? | 用于[被动请求](../advanced/passive.md)的来源信息 <badge type="warning">实验性</badge> |

事件分为登录事件与非登录事件，其中登录事件特指与 Login 变化相关的事件 (如 [login-added](../resources/login.md#login-added))。所有事件都采用上述数据结构，不过在细节上有所区别：

- 非登录事件中的 `login` 资源只会带有 `sn`, `user` 和 `platform` 三个属性；
- 非登录事件均确保 `login.status` 为 `ONLINE` (尽管不会传递这个字段)；
- 登录事件会带有完整的 `login` 资源，但可能不存在 `user` 和 `platform`；
- 登录事件不参与[会话恢复](#session-recovery)。

事件中的各属性遵循[资源提升](./index.md)规则。

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
| `op` | [Opcode](#opcode) | 信令类型 |
| `body` | object? | 信令数据 |

`IDENTIFY` 信令的 `body` 数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `token` | string? | 鉴权令牌 |
| `sn` | number? | 序列号 |

`READY` 信令的 `body` 数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `logins` | [Login](../resources/login.md#def-login)[] | 登录信息 |
| `proxy_urls` | string[] | [代理路由](../advanced/resource.md#proxy-route)列表 |

`META` 信令的 `body` 数据结构如下：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `proxy_urls` | string[] | [代理路由](../advanced/resource.md#proxy-route)列表 |

`EVENT` 信令的 `body` 数据结构参见 [Event](#event)。

### 鉴权

WebSocket 鉴权通过 `IDENTIFY` 信令的 `token` 字段来实现。其中涉及的鉴权令牌由 SDK 分发，本协议不做任何限制。

如果 SDK 没有配置鉴权，则应用无需提供上述字段。

### 会话恢复 {#session-recovery}

当连接短暂中断时，Satori 应用可以通过 `IDENTIFY` 信令的 `sn` 字段来恢复会话。`sn` 字段的值为上一次连接中最后一个接收到的 `EVENT` 信令的 `sn` 字段。会话恢复后，SDK 会向应用推送所有在断开连接期间发生的事件。

登录事件将不会在会话恢复过程中推送，因为在 `READY` 信令中已经包含了最新的登录状态。

## WebHook <badge>可选</badge> <badge type="warning">实验性</badge>

::: tip
这是一个可选功能。
:::

WebHook 服务是指，Satori SDK 在接收到平台事件时，向应用提供的 HTTP 地址推送事件。一个 SDK 应当可以配置多个 WebHook，并允许应用对发送者进行鉴权。这些 WebHook 的配置方式由 SDK 自身决定，本协议仅规范化了一组 [API](../advanced/meta.md#api)，不做强制要求。

事件推送以 POST 的形式进行。请求头包含 `Satori-Opcode` 字段，对应本次推送的[信令类型](#opcode)；请求体是一个 JSON 对象，对应本次推送的信令数据。例如，一次事件推送将会拥有 `Satori-Opcode: 0` 的请求头，以及一个符合 [Event](#event) 结构的请求体。

WebHook 所涉及的信令仅包含 `EVENT`, `META` 两种。

应用收到 WebHook 请求时，如果能够顺利鉴权并处理请求，应当返回 2XX 的状态码。如果鉴权失败，应当返回 4XX 的状态码。如果处理失败，应当返回 5XX 的状态码。

### 反向鉴权

::: tip
这里的鉴权与 API 与 WebSocket 中的鉴权逻辑类似，但方向相反。
:::

Satori 应用可以要求 SDK 在发送 WebHook 请求时附带一个 `Authorization` 请求头，格式为 `Bearer {token}`。其中，`token` 由应用进行分发。
