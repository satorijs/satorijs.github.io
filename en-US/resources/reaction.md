# Reaction <badge type="warning">Experimental</badge>

## API

### Add Reaction {#api-reaction-create}

> <badge>POST</badge> `/reaction.create` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `emoji` | string | reaction emoji |

Add a reaction to a specific message.

### Remove Reaction {#api-reaction-delete}

> <badge>POST</badge> `/reaction.delete` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `emoji` | string | reaction emoji |
| `user_id` | string? | user id |

Remove a specific reaction added by a user from a specific message. If no user id is provided, it removes the reaction added by the current user.

### Clear Reactions {#api-reaction-clear}

<badge>POST</badge> `/reaction.clear` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `emoji` | string? | reaction emoji |

Clear a specific reaction from a specific message. If no emoji is provided, it clears all reactions.

### Get Reaction List {#api-reaction-list}

> <badge>POST</badge> `/reaction.list` {.route}

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| `channel_id` | string | channel id |
| `message_id` | string | message id |
| `emoji` | string | reaction emoji |
| `next` | string? | pagination token |

Get all the users who added a specific reaction to a specific message. Returns a [paginated list](../protocol/api.md#list) of [User](./user.md#def-user) objects.

## Events

### reaction-added

Triggered when a reaction is added.

### reaction-removed

Triggered when a reaction is removed.
