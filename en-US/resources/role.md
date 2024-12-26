# Guild Role <badge type="warning">experimental</badge>

## Definitions

### GuildRole {#def-guild-role}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | string | role ID |
| name | string? | role name |

## API

### Set Guild Member Role {#api-guild-member-role-set}

> <badge>POST</badge> `/guild.member.role.set` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| user_id | string | user ID |
| role_id | string | role ID |

Set a role for a user in the guild.

### Unset Guild Member Role {#api-guild-member-role-unset}

> <badge>POST</badge> `/guild.member.role.unset` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| user_id | string | user ID |
| role_id | string | role ID |

Remove a role from a user in the guild.

### Get Guild Role List {#api-guild-role-list}

> <badge>POST</badge> `/guild.role.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| next | string? | pagination token |

Get all roles in a guild. Returns a [List](../protocol/api.md#list) of [GuildRole](#def-guild-role) objects.

### Create Guild Role {#api-guild-role-create}

> <badge>POST</badge> `/guild.role.create` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| data | [GuildRole](#def-guild-role) | role data |

Create a guild role. Returns a [GuildRole](#def-guild-role) object.

### Update Guild Role {#api-guild-role-update}

> <badge>POST</badge> `/guild.role.update` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| role_id | string | role ID |
| data | [GuildRole](#def-guild-role) | role data |

Update a guild role.

### Delete Guild Role {#api-guild-role-delete}

> <badge>POST</badge> `/guild.role.delete` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| guild_id | string | guild ID |
| role_id | string | role ID |

Delete a guild role.

## Events

### guild-role-created

Triggered when a guild role is created. Required resources: [`guild`](./guild.md#def-guild), [`role`](#def-guild-role).

### guild-role-updated

Triggered when a guild role is updated. Required resources: [`guild`](./guild.md#def-guild), [`role`](#def-guild-role).

### guild-role-deleted

Triggered when a guild role is deleted. Required resources: [`guild`](./guild.md#def-guild), [`role`](#def-guild-role).
