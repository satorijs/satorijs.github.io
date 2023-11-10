# 内部接口 <badge>可选</badge>

::: tip
这是一个可选功能。
:::

Satori 提供了访问任意平台原生接口的能力。这意味着，你可以大多数情况下编写通用代码，并在需要的时候使用原生接口来实现平台特定功能。

这些原生 API 和事件被统称为内部接口。你可以名为 `internal` 的路由或事件来访问它们。

## API 扩展

SDK 可以通过 `/{path}/{version}/internal/{method}` 路由代理平台原生 API。通信方式与 [HTTP API](../protocol/api.md) 类似。返回值与平台返回值一致。

一个合法的请求示例形如：

```text
POST /v1/internal/get_channel
Content-Type: application/json
Authorization: Bearer 1234567890
X-Platform: discord
X-Self-ID: 1234567890

["1234567890"]
```

## 事件扩展

### 平台原生事件

SDK 可以通过 `internal` 事件的 `_type` 和 `_data` 属性代理平台原生事件。它的结构如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 事件 ID |
| `type` | string | 事件类型 (固定为 `internal`) |
| `platform` | string | 接收者的平台名称 |
| `self_id` | string | 接收者的平台账号 |
| `timestamp` | number | 事件的时间戳 |
| `_type` | string | 原生事件类型 |
| `_data` | object | 原生事件数据 |

### 标准事件的扩展字段

标准事件的平台原生字段也可以通过上述 `_type` 和 `_data` 访问。它的结构如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | string | 事件类型 (不应该是 `internal`) |
| `_type` | string | 平台通用名称 |
| `_data` | object | 原生事件数据 |
| 其他字段 |  | 其他标准事件字段 |

::: tip
有些平台原生事件可以直接对应到标准事件。当这些事件触发时，SDK 可以同时触发标准事件和平台原生事件。这两个事件都带有 `_type` 和 `_data` 字段，但这两个字段的值可能是不同的。
:::

## 消息元素扩展

### 平台原生消息元素

平台可以提供原生消息元素，但需要加上平台通用名称作为前缀。下面是一个例子：

```html
<kook:card size="lg">
  <kook:countdown end-time="1608819168000"/>
</kook:card>
```

### 标准元素的扩展属性

标准元素的平台原生属性也可以通过加上平台通用名称作为前缀的方式声明。下面是一个例子：

```html
<!-- src 是 audio 元素的标准属性。 -->
<!-- 但 cover 并未标准化，所以需要加前缀。 -->
<audio src="url1" kook:cover="url2"/>
```

::: tip
平台原生消息元素的属性是否需要前缀由 SDK 实现自行决定。如果某个消息元素希望在未来标准化，那么加上前缀可以降低迁移成本。如果没有标准化需要，那么去掉前缀在书写上更方便。
:::
