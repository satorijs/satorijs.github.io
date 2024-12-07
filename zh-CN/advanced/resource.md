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
Satori-Platform: discord
Satori-User-ID: 1234567890

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
  "foo": "satori:discord/1234567890/_tmp/3j6emd92-image1.png",
  "bar": "satori:discord/1234567890/_tmp/reacpmeq-image2.gif"
}
```

在实现此 API 时，如果平台已经支持了文件上传功能，可以直接使用平台提供的上传 API，返回平台的 URL 即可。如果平台不支持文件上传功能，应当回退到 SDK 提供的默认实现。

SDK 可以基于本地文件系统实现上传功能。上传到本地文件系统中的文件 URL 通过 `satori:` 协议进一步代理，且有一定的有效期。各实现可以根据自身情况调整有效期，推荐值为 5 分钟。

## 内部链接 {#internal-url}

`satori:` 称为内部链接协议，用于代理一些无法直接通过公网访问的资源。

内部链接的标准格式如下：

```text
satori:{platform}/{user.id}/{path}
```

其中，`platform` 为平台名称，`user.id` 为登录号，`path` 为资源路径。

### 适用场景 {#scenario}

上一节中已经提到，在不支持文件上传的平台上调用 `/upload.create`，你将获得内部链接。除此以外，还有一些内部链接的适用场景。

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

与内部链接相比，另一些实践则是不推荐的。下面的方案来源于一些经典聊天协议的实现。通过与这些方案进行对比，可以更好地理解内部链接的优势。

::: warning
**不推荐：`data:` URL**

一种不推荐的方案是直接下载资源，并转换为 `data:` 链接放入消息元素中。之所以不推荐使用，是因为这种方案有两大致命缺点：

- 这些图片本来可以按需加载，但现在却被强制下载到本地，造成额外的带宽消耗；
- 编码为 `data:` 会导致消息体积大幅增加，极大影响消息处理的性能。
:::

::: warning
**不推荐：本地代理**

另一种方案是由 SDK 额外提供一个用于访问资源的路由 (比如下文介绍的代理路由)，并将资源链接转换为能访问到该路由的 URL。相比内部链接，这种方案有两个缺点：

- 这样生成的链接与 Satori 服务器自身的地址耦合，一旦 Satori 服务器更换域名或者端口，过去的链接将全部失效，不利于迁移和跨接等复杂场景；
- 如果需要扩展其他需要用到资源的逻辑 (比如下载图片到本地)，就会导致通过网络自己请求自己，而这些数据原本可以在内存或硬盘中传输，这显然引入了额外的性能损耗。
:::

## 代理路由 {#proxy-route}

假设你在开发基于 Satori 的聊天平台客户端，你希望可以直接将 Satori 协议中给出的资源链接用于 HTML，但很多情况下你都难以如愿：

1. 该资源链接由平台生成，且含有防盗链机制，无法在跨域请求中访问；
2. 该资源链接是一个内部链接，无法在 HTML 中直接访问。

为此，SDK 需要额外提供一个代理路由 `/{path}/{version}/proxy/{url}`，用于访问这些资源链接。这个路由不需要 `Satori-Platform` 和 `Satori-User-ID` 请求头。

下面是两个典型的代理路由请求示例 (分别对应上述两种情况)：

```text
GET /v1/proxy/https://cdn.discordapp.com/attachments/bf6f121d.jpg
GET /v1/proxy/satori:discord/1234567890/_tmp/3j6emd92-image1.png
```

在具体的应用场景中，代理路由可根据需要添加 `Access-Control-Allow-Origin` 等响应头，以限制或允许跨域请求。

为了辨别需要代理的路径以防滥用，Satori 还引入了 [`proxy_urls`](../protocol/events.md) 属性。这个属性记录了所有需要代理的 (非内部) 资源链接前缀，应用侧可以根据这个属性来判断是否需要代理。

根据 `url` 的不同形式，SDK 提供的代理路由会有不同的行为：

- 如果 `url` 不是合法的 URL，直接返回 400；
- 如果 `url` 是一个内部链接 (即以 `satori:` 开头)：
  - 如果链接不符合内部链接的格式，直接返回 400；
  - 解析链接中的 `platform` 和 `user.id`，并找到对应的登录号；
  - 如果登录号存在，则由该登录号的扩展逻辑进行返回；
  - 如果登录号不存在，直接返回 404；
- 如果 `url` 以某个 [`proxy_urls`](../protocol/events.md) 中的链接为前缀：
  - 在 SDK 侧下载该 `url` 并返回 (SDK 提供了该资源的代理)；
- 其他情况下：直接返回 403。

## 最佳实践 {#best-practice}

综上所述，我们总结出了一套关于资源链接的最佳实践：

对于 SDK 开发者，你需要：

1. 提供 `REGISTER_INTERNAL_ROUTE` 方法用于注册内部链接路由，以便适配器实现；
2. 提供 `DOWNLOAD_URL` 方法用于将一个链接下载为数据，无论其是否为内部链接；
3. 基于本地文件系统实现内置的 `/upload.create` API；
4. 基于上述 `DOWNLOAD_URL` 方法实现代理路由。

对于适配器开发者，你需要：

1. 如果需要使用内部链接 (下一条)：调用 `REGISTER_INTERNAL_ROUTE` 方法注册相应的路由；
2. 接收事件推送时：如果收到的资源链接符合内部链接的适用场景，将它们转化为内部链接；
3. 发送消息时：根据平台行为和资源链接的形式，合理选择下载和发送资源的方式；
4. 如果平台支持文件上传：实现 `/upload.create` API，覆盖 SDK 的默认实现。
