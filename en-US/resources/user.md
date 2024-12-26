# User

## Definitions

### User {#def-user}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | string | user ID |
| name | string? | user name<sup>[[1]](#name-nick)</sup> |
| nick | string? | user nickname<sup>[[1]](#name-nick)</sup> |
| avatar | string? | user avatar |
| is_bot | boolean? | whether the user is a bot |

::: tip
**[1] Difference between `name` and `nick`** {#name-nick}

Both fields can be used to identify a user. On some platforms (e.g., Telegram), a user may have multiple types of names, so the SDK can set both fields. On other platforms, these concepts may not be distinct, in which case the SDK only needs to set either `name` or `nick` based on semantics.

In application-level implementations, `nick` takes precedence over `name` because nicknames are easier for users to recognize and understand. If you are developing a client based on the Satori protocol, you should prioritize displaying the `nick` field for usernames and only use the `name` field when `nick` is absent.
:::

## API

### Get User Information {#api-user-get}

> <badge>POST</badge> `/user.get` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| user_id | string | user ID |

Get a user by ID. Returns a [User](#def-user) object.

### Get Friend List {#api-friend-list}

> <badge>POST</badge> `/friend.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| next | string? | pagination token |

Get the friend list. Returns a [List](../protocol/api.md#list) of [User](#def-user) objects.

### Handle Friend Request {#api-friend-approve}

> <badge>POST</badge> `/friend.approve` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| message_id | string | request ID |
| approve | boolean | whether to approve the request |
| comment | string? | comment |

Handle a friend request.

## Events

### friend-request

Triggered when a new friend request is received. Required resource: [`user`](#def-user).
