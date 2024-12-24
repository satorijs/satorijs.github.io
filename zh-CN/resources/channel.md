# 频道 (Channel)

## 类型定义

### Channel

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 频道 ID |
| type | [ChannelType](#channeltype) | 频道类型 |
| name | string? | 频道名称 |
| parent_id | string? | 父频道 ID |

### ChannelType

| 名称 | 值 | 描述 |
| --- | --- | --- |
| TEXT | 0 | 文本频道 |
| DIRECT | 1 | 私聊频道 |
| CATEGORY | 2 | 分类频道 |
| VOICE | 3 | 语音频道 |

## API

### 获取群组频道 {#api-channel-get}

> <badge>POST</badge> `/channel.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |

根据 ID 获取频道。返回一个 [Channel](#channel) 对象。

### 获取群组频道列表 {#api-channel-list}

> <badge>POST</badge> `/channel.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| next | string? | 分页令牌 |

获取群组中的全部频道。返回一个 [Channel](#channel) 的 [分页列表](../protocol/api.md#list)。

### 创建群组频道 {#api-channel-create}

> <badge>POST</badge> `/channel.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| data | [Channel](#channel) | 频道数据 |

创建群组频道。返回一个 [Channel](#channel) 对象。

### 修改群组频道 {#api-channel-update}

> <badge>POST</badge> `/channel.update` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| data | [Channel](#channel) | 频道数据 |

修改群组频道。

### 删除群组频道 {#api-channel-delete}

> <badge>POST</badge> `/channel.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |

删除群组频道。

### 禁言群组频道 <badge type="warning">实验性</badge> {#api-channel-mute}

> <badge>POST</badge> `/channel.mute` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |
| duration | number | 禁言时长 (毫秒) |

禁言群组频道。如果传入的禁言时长为 `0` 则表示解除禁言。

### 创建私聊频道 {#api-user-channel-create}

> <badge>POST</badge> `/user.channel.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| user_id | string | 用户 ID |
| guild_id | string? | 群组 ID |

创建一个私聊频道。返回一个 [Channel](#channel) 对象。
