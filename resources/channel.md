# Channel

## Definition

### Channel

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | channel ID |
| name | string | channel name |

## API

### Get Channel

- <badge>POST</badge> `/basic/channel.get`
- <badge>GET</badge> `/rest/channel/{channel_id}`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| channel_id | string | channel ID |

Get a channel by ID. Returns a [channel](#channel-1) object.

### bot.getChannelList(guildId, next?)

- <badge>POST</badge> `/basic/channel.list`
- <badge>GET</badge> `/rest/guilds/{guild_id}/channels`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| guild_id | string | guild ID |
| next | string | pagination token |

Get channels in a guild. Returns a [list](../protocol/pagination.md) of [channel](#channel-1) objects.
