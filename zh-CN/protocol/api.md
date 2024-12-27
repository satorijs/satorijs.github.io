# API

Satori 协议规定了一套基于 HTTP 的 API 服务，用于发送消息和调用其他功能。

## HTTP API

这是一套 HTTP RPC 风格的 API，所有 URL 的形式均为 `/{path}/{version}/{resource}.{method}`。其中，`path` 为部署路径 (可以为空)，`version` 为 API 的版本号，`resource` 是资源类型，`method` 为方法名。

目前 Satori 仅有 v1 一个版本。

绝大多数 API 的请求都使用 `POST`，参数通过 `application/json` 编码在请求体中。返回值也是 JSON 格式。作为特例，[文件上传](../advanced/resource.md#api-upload-create) API 使用 `multipart/form-data` 编码。

请求头中需要包含 `Satori-Platform` 和 `Satori-User-ID` 字段，分别表示平台名称和平台账号。

一个合法的请求示例形如：

```text
POST /v1/channel.get
Content-Type: application/json
Authorization: Bearer 1234567890
Satori-Platform: discord
Satori-User-ID: 1234567890

{"channel_id": "1234567890"}
```

### 鉴权

鉴权通过 HTTP API 中的 `Authorization` 请求头来实现。其中涉及的鉴权令牌由 SDK 分发，本协议不做任何限制。

如果 SDK 没有配置鉴权，则应用无需提供上述请求头。

### 状态码

| 状态码 | 描述 |
| --- | --- |
| 200 (OK) | 请求成功 |
| 400 (BAD REQUEST) | 请求格式错误 |
| 401 (UNAUTHORIZED) | 缺失鉴权 |
| 403 (FORBIDDEN) | 权限不足 |
| 404 (NOT FOUND) | API 不存在 |
| 405 (METHOD NOT ALLOWED) | 请求方法不支持 |
| 5XX (SERVER ERROR) | 服务器错误 |

::: tip
如果某个标准 API 没有被某个平台支持，则应该返回 404 (NOT FOUND) 而非 501 (NOT IMPLEMENTED)。只有当一个 API 被平台支持但是未被适配器实现时，才应该返回 501。
:::

### 平台特性 <badge type="warning">实验性</badge> {#platform-features}

[Login](../resources/login.md#def-login) 对象中的 `features` 字段是一个字符串数组，用于表示平台的特性。这些特性可以用于判断平台是否支持某些 API。合法的平台特性包括：

- API 可用性，如特性 `message.delete` 表示支持使用 [`message.delete`](../resources/message.md#api-message-delete) 撤回消息。
- API 额外特性，如特性 `message.list.from` 表示使用 [`message.list`](../resources/message.md#api-message-create) 查询消息列表时支持将消息 ID 作为分页令牌。
- 平台额外特性，如特性 `guild.plain` 表示该平台的群组内只能存在一个消息频道。

目前仅有 API 名称本身是规范的用法。我们将在后续版本中提供更全面的标准特性列表。

### 进阶 API

除了标准 API 外，Satori 还提供了一些进阶功能。

- `/{path}/{version}/proxy` 的子路由用于代理平台资源，请参见 [代理路由](../advanced/resource.md#proxy-route)。
- `/{path}/{version}/meta` 的子路由用于访问 SDK 相关接口，请参见 [元信息 API](../advanced/meta.md#api)。
- `/{path}/{version}/internal` 的子路由用于访问平台内部接口，请参见 [内部 API](../advanced/internal.md#api)。

## 类型定义

### 分页列表 {#list}

部分 API 可能会返回分页数据。这种情况下，响应会是一个 `List` 对象：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `data` | array | 数据 |
| `next` | string? | 下一页的令牌 |

你可以使用 `next` 令牌来获取下一页的数据。如果 `next` 为空，则表示没有更多数据了。

### 双向分页列表 {#bidi-list}

极少数 API 返回可双向延伸的分页数据。这种情况下，响应会是一个 `BidiList` 对象：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `data` | array | 数据 |
| `prev` | string? | 上一页的令牌 |
| `next` | string? | 下一页的令牌 |

在对应的 API 中，你可以通过 `direction` 和 `order` 参数来指定方向和排序。

`direction` 参数有三种不同的取值：

- `before`：向前获取数据，此时 `prev` 和 `next` 相同，均表示上一页的令牌。
- `after`：向后获取数据，此时 `prev` 和 `next` 相同，均表示下一页的令牌。
- `around`：向两侧获取数据，此时 `prev` 表示上一页的令牌，`next` 表示下一页的令牌。

如果 `prev` 或 `next` 缺失，则表示在该方向上没有更多数据了。

`order` 参数有两种不同的取值：

- `asc`：升序排列。
- `desc`：降序排列。
