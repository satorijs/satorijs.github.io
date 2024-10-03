# 跨平台

作为一个跨平台的聊天协议，Satori 提供了访问任意平台原生接口的能力。这意味着，你可以大多数情况下编写通用代码，并在需要的时候使用原生接口来实现平台特定功能。

这些原生 API 和事件被统称为内部接口。你可以名为 `internal` 的路由或事件来访问它们。

## 平台与适配器 {#platform-adapter}

Satori 协议的大多数 API 都需要传入 `Satori-Platform` 和 `Satori-User-ID` 请求头，这是为了区分发起请求的登录号。不同平台的登录号拥有不同的 `login.platform`，而同一平台的不同登录号则拥有不同的 `login.user.id`，由此这套机制实现了安全的隔离。

大多数聊天平台的 `platform` 字段都是直接由 SDK 设置的固定值。然而对于另一些允许自建的平台 (例如 Rocket Chat 和 Zulip)，SDK 则通常需要让部署者自行设置 `platform`，用来区分不同的服务器。如果直接混用的话，可能导致数据碰撞等问题。

所以对于任何一个 Login，我们实际上存在两个不同的概念：

- `login.platform`：聊天平台。通常来说，同一平台内的用户间具有相互发送消息的能力，而不同平台的用户间则没有。在 Satori 中，`platform` 也相当于一种命名空间，因此 SDK 需要保证同一平台内的 `user.id`, `guild.id` 等字段的唯一性。

- `login.adapter`：适配器。适配器更多地是一个实现相关的概念，它决定了如何与平台进行通信。同一个适配器下通常会有相同的扩展 API、事件和消息元素。这个字段通常是 SDK 直接设置的，开发者可以用这个字段判断实现是否支持某些特性。

需要注意的是，这两个概念实际上是多对多的，我们可以举出一些特殊场景：

- **单适配器多平台**：某平台允许用户自建服务器，此时两台独立的自建服务器拥有不同的数据，所有的 `user.id`, `guild.id` 等属于不同的命名空间，因此 `platform` 字段应该是不同的。但这两台服务器使用的通信方式相同，因此 `adapter` 字段应该是相同的。

- **单平台多适配器**：某平台同时有官方和非官方的 SDK，两套 SDK 使用的通信方式不同，因此 `adapter` 字段应该是不同的。但这两套 SDK 都是为了与同一平台通信，所有的 `user.id`, `guild.id` 等属于同一个命名空间，因此 `platform` 字段应该是相同的。

## API 扩展

SDK 可以通过 `/{path}/{version}/internal/{method}` 路由代理平台原生 API。通信方式与 [HTTP API](../protocol/api.md) 类似。返回值与平台返回值一致。

一个合法的请求示例形如：

```text
POST /v1/internal/get_channel
Content-Type: application/json
Authorization: Bearer 1234567890
Satori-Platform: discord
Satori-User-ID: 1234567890

["1234567890"]
```

## 事件扩展

### 平台原生事件

SDK 可以通过 `internal` 事件的 `_type` 和 `_data` 属性代理平台原生事件。它的结构如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 事件 ID |
| `type` | string | 事件类型 (固定为 `internal`) |
| `login` | [Login](../resources/login.md) | 登录信息 |
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

平台可以提供原生消息元素，但需要加上适配器名称作为前缀。下面是一个例子：

```html
<kook:card size="lg">
  <kook:countdown end-time="1608819168000"/>
</kook:card>
```

### 标准元素的扩展属性

标准元素的平台原生属性也可以通过加上适配器名称作为前缀的方式声明。下面是一个例子：

```html
<!-- src 是 audio 元素的标准属性。 -->
<!-- 但 cover 并未标准化，所以需要加前缀。 -->
<audio src="url1" kook:cover="url2"/>
```

::: tip
平台原生消息元素的属性是否需要前缀由 SDK 实现自行决定。如果某个消息元素希望在未来标准化，那么加上前缀可以降低迁移成本。如果没有标准化需要，那么去掉前缀在书写上更方便。
:::
