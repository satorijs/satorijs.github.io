# 管理接口 <badge>可选</badge> <badge type="warning">实验性</badge>

::: tip
这是一个可选功能。
:::

::: warning
这是一个实验性功能。
:::

管理 API 包含了与 SDK 状态相关、与具体的平台无关的操作，例如创建和移除 WebHook 等。

管理 API 通过 `/{path}/{version}/admin/{method}` 路由提供。通信方式与 [HTTP API](../protocol/api.md) 类似，但不需要 `Satori-Platform` 和 `Satori-User-ID` 请求头。

## API

### 获取登录信息列表

> <badge>POST</badge>`/admin/login.list` {.route}

返回 [Login](../resources/login.md) 对象构成的数组。

### 创建 WebHook

> <badge>POST</badge>`/admin/webhook.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| url | string | WebHook 地址 |
| token | string? | 鉴权令牌 |

### 移除 WebHook

> <badge>POST</badge>`/admin/webhook.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| url | string | WebHook 地址 |
