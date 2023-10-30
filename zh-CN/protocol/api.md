# API

Satori 协议规定了一套基于 HTTP 的 API 服务，用于发送消息和调用其他功能。

## HTTP API

这是一套 HTTP RPC 风格的 API，所有 URL 的形式均为 `/{path}/{version}/{resource}.{method}`。其中，`path` 为部署路径 (可以为空)，`version` 为 API 的版本号，`resource` 是资源类型，`method` 为方法名。

目前 Satori 仅有 v1 一个版本。

所有 API 的请求都使用 POST，参数以 `application/json` 的形式编码在请求体中。返回值也是 JSON 格式。

请求头中需要包含 `X-Platform` 和 `X-Self-ID` 字段，分别表示平台名称和平台账号。

一个合法的请求示例形如：

```text
POST /v1/channel.get
Content-Type: application/json
Authorization: Bearer 1234567890
X-Platform: discord
X-Self-ID: 1234567890

{"channel_id": "1234567890"}
```

### 状态码

| 状态码 | 描述 |
| --- | --- |
| 200 (OK) | 请求成功 |
| 400 (BAD REQUEST) | 请求格式错误 |
| 401 (UNAUTHORIZED) | 缺失鉴权 |
| 403 (FORBIDDEN) | 权限不足 |
| 404 (NOT FOUND) | 资源不存在 |
| 405 (METHOD NOT ALLOWED) | 请求方法不支持 |
| 5XX (SERVER ERROR) | 服务器错误 |

### 鉴权

鉴权通过 HTTP API 中的 `Authorization` 请求头来实现。其中涉及的鉴权令牌由 SDK 分发，本协议不做任何限制。

如果 SDK 没有配置鉴权，则应用无需提供上述请求头。

### 分页

部分 API 可能会返回一组数据。这种情况下，响应会是一个 `List` 对象：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `data` | array | 数据 |
| `next` | string? | 下一页的令牌 |

你可以使用 `next` 令牌来获取下一页的数据。如果 `next` 为空，则表示没有更多数据了。

## 扩展 API

除了标准的资源 API 外，Satori 还提供了一些扩展 API，用于获取特定的数据。

- `/{path}/{version}/admin` 的子路由用于访问 SDK 相关接口，请参见 [管理 API](./events.md#管理-api)。
- `/{path}/{version}/internal` 的子路由用于访问平台内部接口，请参见 [内部 API](./internal.md#内部-api)。
