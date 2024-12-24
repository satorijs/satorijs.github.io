# 登录信息 (Login)

## 类型定义

### Login

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `sn` | number | 序列号<sup>[[1]](#login-sn)</sup> <badge type="warning">实验性</badge> |
| `platform` | string?<sup>[[3]](#login-nullable)</sup> | 平台名称 |
| `user` | [User](./user.md)?<sup>[[3]](#login-nullable)</sup> | 用户对象<sup>[[2]](#login-user)</sup> |
| `status` | [LoginStatus](#loginstatus) | 登录状态 |
| `adapter` | string | [适配器名称](../advanced/internal.md#platform-adapter) <badge type="warning">实验性</badge> |
| `features` | string[]? | [平台特性](../protocol/api.md#平台特性) 列表 <badge type="warning">实验性</badge> |

::: tip
[1] `login.sn` 仅用于标识 Login 对象，与平台逻辑无关 (意味着任何平台相关的 API 调用都不需要传入这个 `sn`)，也不进行持久化 (意味着两次连接中同一个登录号的 `sn` 可能是不同的，不同登录号的 `sn` 可能是相同的)。请尤其注意与 `login.user.id` 区分。 {#login-sn}
:::

::: tip
[2] `login.user` 并不一定是真实存在的平台用户，也可以是平台分配的机器人或者应用身份。 {#login-user}
:::

::: tip
[3] 当 `login.status` 不为 `ONLINE` 时，`platform` 和 `user` 可能为空。但实际上，所有的非登录事件中均确保 `login` 处于 `ONLINE` 状态，因此 `platform` 和 `user` 总是有值的。从 SDK 开发的角度，为登录事件和非登录事件提供不同的类型是比较好的做法。 {#login-nullable}
:::

### LoginStatus

| 名称 | 值 | 描述 |
| --- | --- | --- |
| OFFLINE | 0 | 离线 |
| ONLINE | 1 | 在线 |
| CONNECT | 2 | 正在连接 |
| DISCONNECT | 3 | 正在断开连接 |
| RECONNECT | 4 | 正在重新连接 |

## API

### 获取登录信息 {#api-login-get}

> <badge>POST</badge> `/login.get` {.route}

获取登录信息。返回一个 [`Login`](#login) 对象。

<!-- ### 获取方法列表

> <badge>POST</badge>`/method.list` {.route}

获取当前可以调用的方法列表。返回一个 `string` 数组。 -->

## 事件

### login-added

登录被创建时触发。必需资源：`login`。

### login-removed

登录被删除时触发。必需资源：`login`。

### login-updated

登录信息更新时触发。必需资源：`login`。
