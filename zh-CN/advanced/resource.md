# 资源链接 <badge type="warning">实验性</badge>

::: warning
这是一个实验性功能。
:::

## 文件上传 {#api-upload-create}

> <badge>POST</badge>`/upload.create` {.route}

如果要发送的消息中含有图片或其他媒体资源，可以使用此 API 将文件上传至 Satori 服务器并转换为 URL，以便在消息编码中使用。

与其他 API 不同，上传文件的请求体遵循 [`multipart/form-data`](https://datatracker.ietf.org/doc/html/rfc7578#section-4) 格式。下面是一个示例：

```text
POST /v1/upload.create
Content-Type: multipart/form-data
Authorization: Bearer 1234567890
X-Platform: discord
X-Self-ID: 1234567890

--boundary
Content-Disposition: form-data; name="foo"; filename="image1.png"
Content-Type: image/png

binary-data
--boundary
Content-Disposition: form-data; name="bar"; filename="image2.gif"
Content-Type: image/gif

binary-data
--boundary--
```

其中，`Content-Disposition` 中的 `name` 字段表示文件标识符 (必需且不能重复)，`filename` 字段表示文件名 (可选)；`Content-Type` 表示文件类型 (必需)。

返回值是一个字典类型，其中的每个键分别对应于请求体中的文件标识符，值是一个 URL 字符串，可以在消息编码中使用。下面是一个示例的返回值：

```json
{
  "foo": "upload://temp/z0q9lgqb/3j6emd92-image1.png",
  "bar": "upload://temp/z0q9lgqb/reacpmeq-image2.gif"
}
```

在实现此 API 时，如果平台已经支持了文件上传功能，可以直接使用平台提供的上传 API，返回平台的 URL 即可。如果平台不支持文件上传功能，应当回退到 SDK 提供的默认实现。

SDK 可以基于本地文件系统实现上传功能。上传到本地文件系统中的文件 URL 通过 `upload://` 协议进一步代理，且有一定的有效期。各实现可以根据自身情况调整有效期，推荐值为 5 分钟。

## 内部链接 {#upload-url}

`upload://` 称为内部链接协议，用于代理一些无法直接通过公网访问的资源。

### 适用场景 {#scenario}

上一节中已经提到，在不支持文件上传的平台上调用 `upload.create`，你将获得内部链接。除此以外，还有一些内部链接的适用场景。

::: tip
**场景：通过平台 API 请求资源**

某些平台使用 ID 标识资源文件 (例如 Lark)。当你接收到来自平台的消息时，拿到的是资源 ID 而非链接。此时你需要调用平台 API，将资源 ID 转换为链接，才能构造合法的消息元素。

为了避免在不必要的场合损失性能，更推荐的方式是直接将资源 ID 封装进内部链接，并立即构造消息元素。等到真正需要请求资源时再调用平台的 API。
:::

::: tip
**场景：资源链接不宜直接公开**

对于另一些平台，尽管其提供的资源链接是可用的，但这个链接中会明文包含机器人令牌，并非可以公开使用的链接 (例如 Telegram)。因此，对于这些平台中的资源，我们也不能直接使用其链接，同样需要将其封装进内部链接。此时内部链接就是单纯的代理。
:::

### 不同方案对比 {#comparison}

与内部链接相比，另一些实践则是不推荐的。

::: warning
**不推荐：`data:` URL**

一种不推荐的方案是直接下载资源，并转换为 `data:` 链接放入消息元素中。之所以不推荐使用，是因为这种方案有两大致命缺点：

- 这些图片本来可以按需加载，但现在却被强制下载到本地，造成额外的带宽消耗；
- 编码为 `data:` 会导致消息体积大幅增加，极大影响消息处理的性能。
:::

::: warning
**不推荐：本地代理**

另一种方案是由 SDK 额外提供一个用于访问资源的路由 (比如下文介绍的代理路由)，并将资源链接转换为能访问到该路由的 URL。这种方案在 Satori 引入内部链接之前是最佳实践，但现在已经不推荐使用了。相比内部链接，这种方案有两个缺点：

- 这样生成的链接与 Satori 服务器自身的地址耦合，一旦 Satori 服务器更换域名或者端口，过去的链接将全部失效，不利于迁移和跨接等复杂场景；
- 如果需要扩展其他需要用到资源的逻辑 (比如下载图片到本地)，就会导致通过网络自己请求自己，而这些数据原本可以在内存或硬盘中传输，这显然引入了额外的性能损耗。
:::

### 路由唯一性 {#uniqueness}

SDK 本身和不同的平台适配器都可能实现内部链接，因此我们需要保证内部链接的唯一性。

通常，由适配器实现的内部链接需要以 `upload://{platform}/{self_id}/` 开头，确保各个登录号所使用的资源不会冲突。由 SDK 自身实现的内部链接相对没有那么严格，但通常还需要在链接中加入每个实例的唯一标识，以避免跨接过程中的混淆。

无论是适配器还是 SDK 实现的内部链接，都应当将所占用的路由写入 [`login.resource_urls`](../resources/login.md)。

## 代理路由 <badge>可选</badge> {#proxy-route}

::: tip
这是一个可选功能。
:::

假设你在开发基于 Satori 的聊天平台客户端，你希望可以直接将 Satori 协议中给出的资源链接用于 HTML，但很多情况下你都难以如愿：

1. 该资源链接由平台生成，且含有防盗链机制，无法在跨域请求中访问；
2. 该资源链接是一个内部链接，无法在 HTML 中直接访问。

为此，SDK 需要额外提供一个代理路由 `/{path}/{version}/proxy/{url}`，用于访问这些资源链接。这个路由下只接受 GET 请求，且不需要 `X-Platform` 和 `X-Self-ID` 请求头。

下面是一个典型的代理路由请求示例：

```text
GET /v1/proxy/upload://temp/z0q9lgqb/3j6emd92-image1.png
```

在具体的应用场景中，代理路由可根据需要添加 `Access-Control-Allow-Origin` 等响应头，以限制或允许跨域请求。

为了辨别需要代理的路径以防滥用，Satori 还引入了 [`login.resource_urls`](../resources/login.md) 属性。这个属性标注了一个登录号所可能需要代理的资源链接前缀，应用侧可以根据这个属性来判断是否需要代理。

根据 `url` 的不同形式，SDK 提供的代理路由会有不同的行为：

- 如果 `url` 不是合法的 URL，会直接返回 400；
- 如果 `url` 不以任何一个 [`login.resource_urls`](../resources/login.md) 中的前缀开头，会直接返回 403；
- 如果 `url` 是一个内部链接，会由该内部链接的实现决定如何提供此资源 (可能的方式包括直接返回数据、重定向以及资源无法访问的报错)；
- 如果 `url` 是一个外部链接，会在 SDK 侧下载该资源并返回 (通常使用流式传输)。

## 最佳实践 {#best-practice}

综上所述，我们总结出了一套关于资源链接的最佳实践：

对于 SDK 开发者，你需要：

1. 提供 `registerUpload()` 方法用于注册内部链接路由，以便适配器实现；
2. 提供 `download()` 方法用于将一个链接下载为数据，无论是内部链接还是其他链接；
3. 基于本地文件系统实现内置的 `upload.create` API；
4. 基于上述 `download()` 方法实现代理路由。

对于适配器开发者，你需要：

1. 如果需要使用内部链接 (参见下一条)：调用 `registerUpload()` 方法注册相应的路由；
2. 接收事件推送时：如果收到的资源链接符合内部链接的适用场景，将它们转化为内部链接；
3. 发送消息时：根据平台行为和资源链接的形式，合理选择下载和发送资源的方式；
4. 如果平台支持文件上传：实现 `upload.create` API，覆盖 SDK 的默认实现。
