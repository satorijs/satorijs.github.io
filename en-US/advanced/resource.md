# Resource Links <badge type="warning">Experimental</badge>

::: warning
This is an experimental feature and may change in future versions.
:::

### File Upload {#api-upload-create}

> <badge>POST</badge>`/upload.create` {.route}

If the message to be sent contains images or other media resources, you can use this API to upload the file to the Satori server and convert it into a URL for use in message encoding.

Unlike other APIs, the upload request body follows the [`multipart/form-data`](https://datatracker.ietf.org/doc/html/rfc7578#section-4) format. Example:

```text
POST /v1/upload.create
Content-Type: multipart/form-data
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

Here, the `name` field in `Content-Disposition` indicates the file identifier (required and must be unique), and `filename` indicates the file name (optional). `Content-Type` indicates the file type (required).

The response is a dictionary where each key corresponds to a file identifier in the request, and each value is a URL string that can be used in message encoding. Example response:

```json
{
  "foo": "internal:discord/1234567890/_tmp/3j6emd92-image1.png",
  "bar": "internal:discord/1234567890/_tmp/reacpmeq-image2.gif"
}
```

When implementing this API: if the platform already supports file uploads, you can directly use the platform’s upload API and return the platform URL. If the platform does not support file uploads, it should fall back to the SDK’s default implementation.

SDKs may implement uploads on the local filesystem. Files uploaded to the local filesystem are further proxied through the `internal:` scheme and have a limited lifetime. Implementations may adjust the lifetime based on their needs; the recommended value is 5 minutes.

### Internal URLs {#internal-url}

`internal:` is an internal URL scheme used to proxy platform-native APIs or resources that cannot be accessed directly from the public internet.

#### Format Specification {#format}

The standard internal URL format is:

```text
internal:{platform}/{user.id}/{path}
```

Where `platform` is the platform name, `user.id` is the login account, and `path` is the resource path.

SDKs may design resource paths as needed, but paths starting with underscore `_` are reserved for Satori itself and have fixed semantics. Currently reserved paths include:

- `_tmp`: used by the SDK’s default file upload implementation;
- `_api`: used for API bridging/reflection.

#### Applicable Scenarios {#scenario}

As mentioned above, when calling `/upload.create` on a platform that does not support uploads, you will receive an internal URL. Access to platform-native APIs is also handled through internal URLs. Besides that, there are additional scenarios where internal URLs apply.

::: tip
**Scenario: request resources via platform API**

Some platforms use IDs to identify resource files (e.g. Lark). When you receive a message from the platform, you get a resource ID rather than a link. In that case, you need to call the platform API to convert the resource ID into a link before you can construct a valid message element.

To avoid unnecessary performance loss, a better approach is to pack the resource ID into an internal URL and construct the message element immediately. When the resource is actually needed, the platform API can be called then.
:::

::: tip
**Scenario: resource links should not be exposed directly**

On some platforms, although the provided resource link is usable, it includes the bot token in plaintext and should not be exposed publicly (e.g. Telegram). For resources on these platforms, you also cannot use their links directly; they need to be wrapped in an internal URL. In this case, the internal URL acts purely as a proxy.
:::

#### Comparison with Other Approaches {#comparison}

Compared with internal URLs, some other practices are not recommended. The approaches below come from implementations of classic chat protocols. Comparing them helps clarify the advantages of internal URLs.

::: warning
**Not recommended: `data:` URLs**

A discouraged approach is to download the resource directly and convert it into a `data:` URL embedded into the message element. This is not recommended for two fatal reasons:

- Resources could have been loaded on demand, but are now forced to download locally, causing extra bandwidth consumption.
- Encoding as `data:` greatly increases message size and severely impacts message processing performance.
:::

::: warning
**Not recommended: local proxy**

Another approach is for SDKs to provide an extra route for accessing resources (like the proxy route described below), and convert resource links into URLs that point to that route. Compared with internal URLs, this has two drawbacks:

- The generated links are coupled to the Satori server’s own address. Once the Satori server changes domain or port, all previous links will break, which is bad for migration and complex scenarios like bridging.
- If you later extend other resource-related logic (e.g. downloading images locally), you end up “requesting yourself over the network”. Data that could have been transferred via memory or disk now incurs extra network overhead, which is an unnecessary performance loss.
:::

### Proxy Route {#proxy-route}

Suppose you are building a chat client based on Satori and want to use the resource URLs provided by the Satori protocol directly in HTML. In many cases, this is difficult:

1. The URL is generated by the platform and uses anti-hotlinking, so it cannot be accessed via cross-origin requests;
2. The URL is an internal URL, which cannot be accessed directly in HTML.

Therefore, SDKs should additionally provide a proxy route `/{version}/proxy/{url}` to access such resources. This route does not require the `Satori-Platform` and `Satori-User-ID` headers.

Two typical examples (corresponding to the cases above):

```text
GET /v1/proxy/https://cdn.discordapp.com/attachments/bf6f121d.jpg
GET /v1/proxy/internal:discord/1234567890/_tmp/3j6emd92-image1.png
```

In concrete application scenarios, the proxy route may add response headers such as `Access-Control-Allow-Origin` to restrict or allow cross-origin requests as needed.

To determine which paths require proxying and to prevent abuse, Satori also introduces the [`proxy_urls`](../protocol/events.md) field. This field records all (non-internal) resource URL prefixes that need to be proxied. On the application side, you can use it to decide whether a resource needs proxying.

Depending on the form of `url`, an SDK’s proxy route behaves differently:

- If `url` is not a valid URL, return 400.
- If `url` is an internal URL (i.e. starts with `internal:`):
  - If it does not match the internal URL format, return 400.
  - Parse `platform` and `user.id` from the URL and locate the corresponding login.
  - If the login exists, return using that login’s extension logic.
  - If the login does not exist, return 404.
- If `url` starts with a prefix listed in [`proxy_urls`](../protocol/events.md):
  - The SDK downloads `url` and returns it (the SDK provides the proxy).
- Otherwise: return 403.

### Best Practices {#best-practice}

In summary, here are the best practices for resource links:

For **core library developers**, you should:

1. Provide a `REGISTER_INTERNAL_ROUTE` method for registering internal URL routes for adapter implementations.
2. Provide a `DOWNLOAD_URL` method to download a URL as data, regardless of whether it is an internal URL.
3. Implement the built-in `/upload.create` API based on the local filesystem.
4. Implement the proxy route based on the `DOWNLOAD_URL` method.

For **adapter developers**, you should:

1. If the platform fits the internal URL [applicable scenarios](#scenario), call `REGISTER_INTERNAL_ROUTE` to register internal routes.
2. When receiving events: if any received resource link fits the internal URL scenarios, convert it into an internal URL.
3. When sending messages: based on platform behavior and the form of the resource URL, choose an appropriate strategy to download and send the resource.
4. If the platform supports file uploads: implement `/upload.create` to override the SDK’s default implementation.
