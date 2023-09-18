# Channel

## Definition

### Channel

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | channel ID |
| name | string | channel name |

## API

### Get Channel

- <badge>POST</badge> `/v1/channel.get`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| channel_id | string | channel ID |

Get a channel by ID. Returns a [channel](#channel-1) object.

### bot.getChannelList(guildId, next?)

- <badge>POST</badge> `/v1/channel.list`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| guild_id | string | guild ID |
| next | string | pagination token |

Get channels in a guild. Returns a [list](../protocol/api.md#pagination) of [channel](#channel-1) objects.
