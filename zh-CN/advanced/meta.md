# 元信息 <badge type="warning">实验性</badge>

::: warning
这是一个实验性功能，可能在未来的版本中发生变化。
:::

元信息对象包含了与 SDK 状态相关、与具体的账号无关的信息，例如 [代理路由](../advanced/resource.md#proxy-route) 等。

元信息通过以下方式获取和更新：

- 在 WebSocket 推送方式下，`READY` 信令将提供完整的元信息；
- 在 WebHook 推送方式下，应用启动时应当通过 API 获取元信息；
- 应用启动后，持续接收 `META` 信令和登录事件对元信息进行更新。

需要注意的是，`META` 信令不反映登录状态变化，也不会包含 `logins` 字段。

元信息 API 通过 `/{path}/{version}/meta/{method}` 路由提供。通信方式与 [HTTP API](../protocol/api.md) 类似，但不需要 `Satori-Platform` 和 `Satori-User-ID` 请求头。

## 类型定义

### Meta

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `logins` | [`Login[]`](../resources/login.md) | 登录信息 |
| `proxy_urls` | string[] | [代理路由](../advanced/resource.md#proxy-route) 列表 |

## API

### 获取元信息

> <badge>POST</badge>`/meta` {.route}

返回一个 [Meta](#meta) 对象。

### 创建 WebHook <badge>可选</badge>

> <badge>POST</badge>`/meta/webhook.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `url` | string | WebHook 地址 |
| `token` | string? | 鉴权令牌 |

### 移除 WebHook <badge>可选</badge>

> <badge>POST</badge>`/meta/webhook.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `url` | string | WebHook 地址 |
