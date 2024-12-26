# Guild

## Definitions

### Guild {#def-guild}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | guild ID |
| name | string? | guild name |
| avatar | string? | guild avatar |

## API

### Get Guild {#api-guild-get}

> <badge>POST</badge> `/guild.get` {.route}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| guild_id | string | guild ID |

Get a guild by ID. Returns a [Guild](#def-guild) object.

### Get Guild List {#api-guild-list}

> <badge>POST</badge> `/guild.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| next | string | pagination token |

Get guilds where the current user is a member. Returns a [List](../protocol/api.md#list) of partial [Guild](#def-guild) objects.

### Handle Guild Invitation {#api-guild-approve}

> <badge>POST</badge> `/guild.approve` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| message_id | string | request ID |
| approve | boolean | whether to approve the request |
| comment | string? | comment |

Handle an invitation from a guild.

## Events

### guild-added

Triggered when joining a guild. Required resource: `guild`.

### guild-updated

Triggered when a guild is modified. Required resource: `guild`.

### guild-removed

Triggered when leaving a guild. Required resource: `guild`.

### guild-request

Triggered when receiving a new guild invitation. Required resource: `guild`.
