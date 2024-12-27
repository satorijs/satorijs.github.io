# API

The Satori protocol defines a set of HTTP-based API services for sending messages and invoking other functionalities.

## HTTP API

This is an HTTP RPC-style API, where all URLs follow the format `/{path}/{version}/{resource}.{method}`. Here, `path` is the deployment path (which can be empty), version is the API version number, `resource` is the resource type, and `method` is the method name.

Currently, Satori has only one version: v1.

Most API requests use `POST`, with parameters encoded in the request body as `application/json`. The return value is also in JSON format. As an exception, [file upload](../advanced/resource.md#api-upload-create) use `multipart/form-data` encoding.

The request headers must include the `Satori-Platform` and `Satori-User-ID` fields, representing the platform name and platform account, respectively.

A valid request example looks like this:

```text
POST /v1/channel.get
Content-Type: application/json
Authorization: Bearer 1234567890
Satori-Platform: discord
Satori-User-ID: 1234567890

{"channel_id": "1234567890"}
```

### Authentication

Authentication is implemented through the `Authorization` header in the HTTP API. The authentication tokens involved are distributed by the SDK, and this protocol imposes no restrictions on them.

If the SDK is not configured for authentication, the application does not need to provide the above header.

### Status Codes

| 状态码 | 描述 |
| --- | --- |
| 200 (OK) | success |
| 400 (BAD REQUEST) | invalid request format |
| 401 (UNAUTHORIZED) | missing authentication |
| 403 (FORBIDDEN) | insufficient permissions |
| 404 (NOT FOUND) | API does not exist |
| 405 (METHOD NOT ALLOWED) | method not allowed |
| 5XX (SERVER ERROR) | server error |

::: tip
If a standard API is not supported by a platform, it should return 404 (NOT FOUND) instead of 501 (NOT IMPLEMENTED). Only when an API is supported by the platform but not implemented by the adapter should it return 501.
:::

### Platform Features <badge type="warning">experimental</badge> {#platform-features}

The `features` field in the [Login](../resources/login.md#def-login) object is an array of strings used to indicate platform features. These features can be used to determine whether a platform supports certain APIs. Valid platform features include:

- API availability, such as the feature `message.delete` indicating support for using [`message.delete`](../resources/message.md#api-message-delete) to delete messages.
- API additional features, such as the feature `message.list.from` indicating support for using message IDs as pagination tokens when querying message lists with [`message.list`](../resources/message.md#api-message-create).
- Platform additional features, such as the feature `guild.plain` indicating that the platform's guild can only have one message channel.

Currently, only the API names themselves are standardized. We will provide a more comprehensive list of standard features in future versions.

### Advanced APIs

In addition to standard APIs, Satori also provides some advanced functionalities.

- Sub-routes under `/{path}/{version}/proxy` are used to proxy platform resources. See [Proxy Routes](../advanced/resource.md#proxy-route).
- Sub-routes under `/{path}/{version}/meta` are used to access SDK-related interfaces. See [Meta Information API](../advanced/meta.md#api).
- Sub-routes under `/{path}/{version}/internal` are used to access platform internal interfaces. See [Internal API](../advanced/internal.md#api).

## Definitions

### Paginated List {#list}

Some API may return paginated data. In such cases, the response will be a `List` object:

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| `data` | array | list of data |
| `next` | string? | token for the next page |

You can use the `next` token to fetch the next page of data. If `next` is null, it means there is no more data.

### Bidirectional Paginated List {#bidi-list}

A very few APIs return paginated data that can extend in both directions. In such cases, the response will be a `BidiList` object:

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| `data` | array | list of data |
| `prev` | string? | token for the previous page |
| `next` | string? | token for the next page |

In the corresponding APIs, you can specify the direction and order using the `direction` and `order` parameters.

The `direction` parameter has three possible values:

- `before`: fetch data backward. In this case, `prev` and `next` are the same, both representing the token for the previous page.
- `after`: fetch data forward. In this case, `prev` and `next` are the same, both representing the token for the next page.
- `around`: fetch data in both directions. In this case, `prev` represents the token for the previous page, and `next` represents the token for the next page.

If `prev` or `next` is missing, it means there is no more data in that direction.

The `order` parameter has two possible values:

- `asc`: ascending order.
- `desc`: descending order.
