# 表态 (Reaction) <badge type="warning">实验性</badge>

::: warning
这是一个实验性功能。
:::

## API

### 添加表态

> <badge>POST</badge>`/reaction.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |
| emoji | string | 表态名称 |

向特定消息添加表态。

### 删除表态

> <badge>POST</badge>`/reaction.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |
| emoji | string | 表态名称 |
| user_id | string? | 用户 ID |

从特定消息删除某个用户添加的特定表态。如果没有传入用户 ID 则表示删除自己的表态。

### 清除表态

> <badge>POST</badge>`/reaction.clear` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |
| emoji | string? | 表态名称 |

从特定消息清除某个特定表态。如果没有传入表态名称则表示清除所有表态。

### 获取表态列表

> <badge>POST</badge>`/reaction.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| message_id | string | 消息 ID |
| emoji | string | 表态名称 |
| next | string? | 分页令牌 |

获取添加特定消息的特定表态的用户列表。返回一个 [`User`](./user.md) 的 [分页列表](../protocol/api.md#分页)。

## 事件

### reaction-added

当表态被添加时触发。

### reaction-removed

当表态被移除时触发。

<!-- ### reaction-removed-all

当表态被移除时触发。

### reaction-removed-user

当表态被移除时触发。

### reaction-removed-emoji

当表态被移除时触发。 -->
