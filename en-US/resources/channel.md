# Channel

## Definitions

### Channel {#def-channel}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | channel id |
| type | [ChannelType](#channeltype) | channel type |
| name | string? | channel name |
| parent_id | string? | parent channel id |

### ChannelType

| TYPE | VALUE | DESCRIPTION |
| --- | --- | --- |
| TEXT | 0 | text channel |
| DIRECT | 1 | direct message channel |
| CATEGORY | 2 | category channel |
| VOICE | 3 | voice channel |

## API

### Get Guild Channel {#api-channel-get}

> <badge>POST</badge> `/channel.get` {.route}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| channel_id | string | channel id |

Get a channel by id. Returns a [Channel](#def-channel) object.

### Get Guild Channel List {#api-channel-list}

> <badge>POST</badge> `/channel.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| guild_id | string | guild id |
| next | string | pagination token |

Get all channels in a guild. Returns a [paged list](../protocol/api.md#list) of [Channel](#def-channel) objects.

### Create Guild Channel {#api-channel-create}

> <badge>POST</badge> `/channel.create` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild id |
| data | [Channel](#def-channel) | channel data |

Create a guild channel. Returns a [Channel](#def-channel) object.

### Update Guild Channel {#api-channel-update}

> <badge>POST</badge> `/channel.update` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| channel_id | string | channel id |
| data | [Channel](#def-channel) | channel data |

Update a guild channel.

### Delete Guild Channel {#api-channel-delete}

> <badge>POST</badge> `/channel.delete` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| channel_id | string | channel id |

Delete a guild channel.

### Mute Guild Channel <badge type="warning">Experimental</badge> {#api-channel-mute}

> <badge>POST</badge> `/channel.mute` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| channel_id | string | channel id |
| duration | number | mute duration (in milliseconds) |

Mute a guild channel. If the duration is set to 0, it will unmute the channel.

### Create Direct Message Channel {#api-user-channel-create}

> <badge>POST</badge> `/user.channel.create` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| user_id | string | user id |
| guild_id | string? | guild id |

Create a direct message channel. Returns a [Channel](#def-channel) object.
