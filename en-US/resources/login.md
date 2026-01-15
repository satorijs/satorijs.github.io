# Login

## Definitions

### Login {#def-login}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `sn` | number | serial number<sup>[[1]](#login-sn)</sup> <badge type="warning">experimental</badge> |
| `platform` | string?<sup>[[3]](#login-nullable)</sup> | platform name |
| `user` | [User](./user.md)?<sup>[[3]](#login-nullable)</sup> | user object<sup>[[2]](#login-user)</sup> |
| `status` | [LoginStatus](#def-login-status) | login status |
| `adapter` | string | [adapter name](../advanced/internal.md#platform-vs-adapter) <badge type="warning">experimental</badge> |
| `features` | string[]? | list of [platform features](../protocol/api.md#platform-features) <badge type="warning">experimental</badge> |

::: tip
[1] `login.sn` is only used to identify the Login object and is unrelated to platform logic (meaning no platform-related API calls require this `sn`). It is also not persisted (meaning the `sn` for the same login may differ across connections, and different logins may share the same `sn`). Please especially distinguish it from `login.user.id`. {#login-sn}
:::

::: tip
[2] `login.user` is not necessarily a real platform user; it can also be a bot or application identity assigned by the platform. {#login-user}
:::

::: tip
[3] When `login.status` is not `ONLINE`, `platform` and `user` may be null. However, in all non-login events, `login` is guaranteed to be in the `ONLINE` state, so `platform` and `user` will always have truthy values. From an SDK development perspective, it is a good practice to provide different types for login and non-login events. {#login-nullable}
:::

### LoginStatus {#def-login-status}

| TYPE | VALUE | DESCRIPTION |
| --- | --- | --- |
| `OFFLINE` | 0 | offline |
| `ONLINE` | 1 | online |
| `CONNECT` | 2 | connecting |
| `DISCONNECT` | 3 | disconnecting |
| `RECONNECT` | 4 | reconnecting |

## API

### Get Login {#api-login-get}

> <badge>POST</badge> `/login.get` {.route}

Get the current login. Returns a [`Login`](#def-login) object.

## Events

### login-added

Triggered when a login is created. Required resource: [`login`](#def-login).

### login-removed

Triggered when a login is deleted. Required resource: [`login`](#def-login).

### login-updated

Triggered when login information is updated. Required resource: [`login`](#def-login).
