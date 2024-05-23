# 资源文件

## 文件上传 <badge type="warning">实验性</badge> {#api-upload-create}

> <badge>POST</badge>`/upload.create` {.route}

如果要发送的消息中含有图片或其他媒体资源，可以使用此 API 将文件上传至 Satori 服务器并转换为 URL，以便在消息编码中使用。

与其他 API 不同，上传文件的请求体遵循 [`multipart/form-data`](https://datatracker.ietf.org/doc/html/rfc7578#section-4) 格式。下面是一个示例：

```text
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

返回值是一个字典类型，其中的每个键分别对应于请求体中的文件标识符，值是一个 URL 字符串，可以在消息编码中使用。下面是上述示例的返回值：

```json
{
  "foo": "upload://temp/z0q9lgqb07a/3j6emd92zgw-image1.png",
  "bar": "upload://temp/z0q9lgqb07a/reacpmeq2lc-image2.gif"
}
```

在实现此 API 时，如果平台已经支持了文件上传功能，可以直接使用平台提供的上传 API，返回平台的 URL 即可。如果平台不支持文件上传功能，应当回退到 SDK 提供的默认实现。

SDK 可以基于本地文件系统实现上传功能。上传到本地文件系统中的文件 URL 通过 `upload://` 协议进一步代理，且有一定的有效期。各实现可以根据自身情况调整有效期，推荐值为 5 分钟。
