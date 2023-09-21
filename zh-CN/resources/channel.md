# 频道 (Channel)

## 类型定义

### Channel

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 频道 ID |
| name | string | 频道名称 |

## API

### Get Channel

- <badge>POST</badge> `/v1/channel.get`

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | channel ID |

Get a channel by ID. Returns a [channel](#channel-1) object.

### bot.getChannelList(guildId, next?)

- <badge>POST</badge> `/v1/channel.list`

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | guild ID |
| next | string | pagination token |

Get channels in a guild. Returns a [list](../protocol/api.md#分页) of [channel](#channel-1) objects.
