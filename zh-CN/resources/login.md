# 登录信息 (Login)

## 类型定义

### Login

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `sn` | string | 序列号<sup>[[1]](#login-sn)</sup> <badge type="warning">实验性</badge> |
| `adapter` | string | [适配器名称](../advanced/internal.md#platform-adapter) |
| `platform` | string? | 平台名称 |
| `user` | [User](./user.md)? | 用户对象<sup>[[1]](#login-sn)</sup> |
| `status` | [LoginStatus](#loginstatus)? | 登录状态 |
| `features` | string[]? | [平台特性](../protocol/api.md#平台特性) 列表 |

::: tip
**[1] 关于序列号** {#login-sn}

`login.sn` 仅用于标识 Login 对象，与平台逻辑无关 (意味着任何平台相关的 API 调用都不需要传入这个 `sn`)，也不进行持久化 (意味着两次连接中同一个登录号的 `sn` 可能是不同的，不同登录号的 `sn` 可能是相同的)。请尤其注意与 `login.user.id` 区分。

此外，对于桥接场景，则还需要对这个 ID 进行映射。具体的映射方式请参见 [桥接](../advanced/bridge.md)。
:::

::: tip
**[2] 登录信息中的用户** {#login-user}

`login.user` 并不一定是真实存在的平台用户，也可以是平台分配的机器人或者应用身份。
:::

### LoginStatus

| 名称 | 值 | 描述 |
| --- | --- | --- |
| OFFLINE | 0 | 离线 |
| ONLINE | 1 | 在线 |
| CONNECT | 2 | 连接中 |
| DISCONNECT | 3 | 断开连接 |
| RECONNECT | 4 | 重新连接 |

## API

### 获取登录信息

> <badge>POST</badge>`/login.get` {.route}

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
