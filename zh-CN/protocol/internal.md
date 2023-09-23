# 内部接口

Satori 提供了访问任意平台内部接口的能力。这意味着，你可以大多数情况下编写通用代码，并在需要的时候使用内部接口来实现平台特定功能。

## 内部 API

内部 API 通过 `/{version}/internal/{method}` 路由提供。通信方式基本与 [HTTP API](./api.md) 相同。

一个合法的请求示例形如：

```text
POST /v1/internal/get_channel
Content-Type: application/json
Authorization: Bearer 1234567890
X-Platform: discord
X-Self-ID: 1234567890

["1234567890"]
```

## 内部事件

内部事件是一类特殊的事件对象。它的结构如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 事件 ID |
| `type` | string | 事件类型，固定为 `internal` |
| `platform` | string | 接收者的平台名称 |
| `self_id` | string | 接收者的平台账号 |
| `timestamp` | number | 事件的时间戳 |
| `_type` | string | 内部事件类型 |
| `_data` | object | 内部事件数据 |
