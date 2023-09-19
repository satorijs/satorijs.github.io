# API

Satori 协议规定了一套基于 HTTP 的 API 服务，用于发送消息和调用其他功能。

## HTTP API

这是一套 HTTP RPC 风格的 API，所有 URL 的形式均为 `/{version}/{resource}.{method}`。其中，`version` 为 API 的版本号，`resource` 是资源类型，`method` 为方法名。

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

### 鉴权

请查看 [鉴权](./auth.md) 章节。

### 分页

部分 API 可能会返回一组数据。这种情况下，响应会是一个 `List` 对象：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `data` | array | 数据 |
| `next` | ?string | 下一页的令牌 |

你可以使用 `next` 令牌来获取下一页的数据。如果 `next` 为空，则表示没有更多数据了。
