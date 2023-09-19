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
X-Platform: discord
X-Self-ID: 1234567890
{"channel_id": "1234567890"}
```

### 可选字段

由于不同平台实现的差异，Satori 协议中的大部分字段都是可选的。可选字段的类型会以一个 `?` 标记开头 (你可以参考下方的 [分页](#分页) 对象)。

对于任意可选字段，相关 API 调用的结果中可能不含该字段，也可能该字段的值为 `null`。其中，前者表示该 API 并未提供这一字段，但可能由其他 API 提供；后者表示该 API 提供了这一字段，但其值为 `null`。

### 分页

部分 API 可能会返回一组数据。这种情况下，响应会是一个 `List` 对象：

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `data` | array | 数据 |
| `next` | ?string | 下一页的令牌 |

你可以使用 `next` 令牌来获取下一页的数据。如果 `next` 为空，则表示没有更多数据了。
