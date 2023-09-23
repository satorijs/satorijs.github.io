# 鉴权

鉴权通过 HTTP API 中的 `Authorization` 请求头或 `IDENTIFY` 信令中的 `token` 字段来实现。其中涉及的鉴权令牌由 SDK 分发，协议本身不做任何限制。

如果 SDK 没有配置鉴权，则客户端无需提供上述请求头和 `token` 字段。
