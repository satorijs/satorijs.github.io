# Guild Member

## Definitions

### GuildMember {#def-guild-member}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `user` | [User](./user.md#def-user)? | user object |
| `nick` | string? | user's nickname in the guild |
| `avatar` | string? | user's avatar in the guild |
| `joined_at` | number? | join time |

## API

### Get Guild Member {#api-guild-member-get}

> <badge>POST</badge> `/guild.member.get` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `guild_id` | string | guild id |
| `user_id` | string | user id |

Get guild member information. Returns a [GuildMember](#def-guild-member) object.

### Get Guild Member List {#api-guild-member-list}

> <badge>POST</badge> `/guild.member.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `guild_id` | string | guild id |
| `next` | string? | pagination token |

Get all the members in a guild. Returns a [paginated list](../protocol/api.md#list) of [GuildMember](#def-guild-member) objects.

### Kick Guild Member {#api-guild-member-kick}

> <badge>POST</badge> `/guild.member.kick` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `guild_id` | string | guild id |
| `user_id` | string | user id |
| `permanent` | boolean? | whether to permanently ban the user (preventing rejoin) |

Kick a user from the guild.

### Mute Guild Member <badge type="warning">Experimental</badge> {#api-guild-member-mute}

> <badge>POST</badge> `/guild.member.mute` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `guild_id` | string | guild id |
| `user_id` | string | user id |
| `duration` | number | mute duration (in milliseconds) |

Mute a user. If the duration is set to 0, it will unmute the user.

### Approve Guild Member Request {#api-guild-member-approve}

> <badge>POST</badge> `/guild.member.approve` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `message_id` | string | request id |
| `approve` | boolean | whether to approve the request |
| `comment` | string? | comment |

Handle a guild join request.

## Events

### guild-member-added

Triggered when a guild member is added. Required resources: [`guild`](./guild.md#def-guild), [`member`](#def-guild-member), [`user`](./user.md#def-user).

### guild-member-updated

Triggered when guild member information is updated. Required resources: [`guild`](./guild.md#def-guild), [`member`](#def-guild-member), [`user`](./user.md#def-user).

### guild-member-removed

Triggered when a guild member is removed. Required resources: [`guild`](./guild.md#def-guild), [`member`](#def-guild-member), [`user`](./user.md#def-user).

### guild-member-request

Triggered when a new guild join request is received. Required resources: [`guild`](./guild.md#def-guild), [`member`](#def-guild-member), [`user`](./user.md#def-user).
