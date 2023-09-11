# Guild

## Definition

### Guild

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | guild ID |
| name | string | guild name |

## API

### bot.getGuild(guildId)

- <badge>POST</badge> `/basic/guild.get`
- <badge>GET</badge> `/rest/guild/{guild_id}`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| guild_id | string | guild ID |

Get a guild by ID. Returns a [guild](#guild-1) object.

### bot.getGuildList(next?)

- <badge>POST</badge> `/basic/guild.list`
- <badge>GET</badge> `/rest/guilds`

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| next | string | pagination token |

Get guilds where the current user is a member. Returns a [list](../protocol/pagination.md) of partial [guild](#guild-1) objects.

### bot.handleGuildRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理来自群组的邀请。
