# Cross Platform

As a cross-platform chat protocol, Satori provides the ability to access any platform's native interfaces. This means you can write generic code in most cases, and use native interfaces when needed to implement platform-specific functionality.

These native capabilities are collectively referred to as internal interfaces, covering APIs, events, message elements, routes, and more.

## Platform vs Adapter {#platform-vs-adapter}

Most Satori APIs require the `Satori-Platform` and `Satori-User-ID` request headers, in order to distinguish the login account that initiates the request. Different platforms have different `login.platform`, while different accounts on the same platform have different `login.user.id`. With this mechanism, safe isolation is achieved.

For most chat platforms, the `platform` field is a fixed value set directly by SDKs. However, for platforms that can be self-hosted (e.g. Rocket Chat and Zulip), SDKs usually need the deployer to configure `platform` to differentiate between different servers. If mixed directly, this may cause issues such as data collisions.

Therefore, for any Login, there are actually two different concepts:

- `login.platform`: chat platform. Usually, users within the same platform can message each other, while users across different platforms cannot. In Satori, `platform` also acts as a namespace, so SDKs must ensure the uniqueness of `user.id`, `guild.id`, etc. within the same `platform`.
- `login.adapter`: adapter. This is more of an implementation concept: it determines how the platform is communicated with. Under the same adapter, there are usually the same extended APIs, events, and message elements. This field is typically set directly by SDKs, and developers can use it to determine whether the implementation supports certain features.

::: tip
If you still find it hard to distinguish `platform` and `adapter`, remember:

- IDs are compatible within the same `platform`;
- APIs are compatible within the same `adapter`.

These two conditions are sufficient but not necessary. In other words, even if two Logins have compatible IDs or APIs, they may still use different `platform` or `adapter`. This depends entirely on SDK implementation and community conventions.
:::

::: tip
Note that these two concepts are actually many-to-many. Some special scenarios:

- **Single adapter, multiple platforms**: a platform allows self-hosting. Two independent self-hosted servers have different data; all `user.id`, `guild.id`, etc. belong to different namespaces, so `platform` should be different. But they use the same communication method, so `adapter` should be the same.
- **Single platform, multiple adapters**: a platform has both official and unofficial SDKs, and the two SDKs use different communication methods, so `adapter` should be different. But they both target the same platform; all `user.id`, `guild.id`, etc. belong to the same namespace, so `platform` should be the same.
:::

## API Extensions {#api}

SDKs can proxy platform-native APIs via the route `/{path}/{version}/internal/{method}`.

For example, Discord provides a RESTful API, so you can make a request like:

```text
DELETE /v1/internal/channels/111222333
Satori-Platform: discord
Satori-User-ID: 1234567890
```

Except for the prefixed route and the additional `Satori-Platform` and `Satori-User-ID` headers, the request and response formats are identical to the platform’s native API.

## Event Extensions {#events}

### Platform-native Events

SDKs can proxy platform-native events through the `_type` and `_data` fields of the `internal` event. Its structure is:

| Field | Type | Description |
| --- | --- | --- |
| `sn` | number | Event sequence number |
| `type` | string | Event type (fixed as `internal`) |
| `login` | [Login](../resources/login.md) | Login info |
| `_type` | string | Native event type |
| `_data` | object | Native event payload |

### Extension Fields on Standard Events

Platform-native fields for standard events can also be accessed via `_type` and `_data`. Its structure is:

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | Event type (should not be `internal`) |
| `_type` | string | Platform-generic name |
| `_data` | object | Native event payload |
| other fields |  | Other standard event fields |

::: tip
Some platform-native events can map directly to standard events. When such events are triggered, SDKs may emit both a standard event and a platform-native event. Both events include `_type` and `_data`, but their values may differ.
:::

## Message Element Extensions {#elements}

### Platform-native Message Elements

Platforms may provide native message elements, but they must be prefixed with the adapter name. For example:

```html
<kook:card size="lg">
  <kook:countdown end-time="1608819168000"/>
</kook:card>
```

### Extension Attributes on Standard Elements

Platform-native attributes for standard elements can also be declared by prefixing them with the adapter name. For example:

```html
<!-- src is a standard attribute of the audio element. -->
<!-- cover is not standardized, so it needs a prefix. -->
<audio src="url1" kook:cover="url2"/>
```

::: tip
Whether attributes on platform-native message elements need a prefix is up to SDK implementation. If a message element is likely to be standardized in the future, adding a prefix can reduce migration cost. If standardization is not needed, omitting the prefix is more convenient to write.
:::
