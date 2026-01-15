# 群组角色 (GuildRole)

## 类型定义

### GuildRole {#def-guild-role}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `id` | string | 角色 ID |
| `name` | string? | 角色名称 |

## API

### 设置群组成员角色 {#api-guild-member-role-set}

> <badge>POST</badge> `/guild.member.role.set` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `user_id` | string | 用户 ID |
| `role_id` | string | 角色 ID |

设置群组内用户的角色。

### 取消群组成员角色 {#api-guild-member-role-unset}

> <badge>POST</badge> `/guild.member.role.unset` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `user_id` | string | 用户 ID |
| `role_id` | string | 角色 ID |

取消群组内用户的角色。

<!-- ### 获取群组成员角色列表 {#api-guild-member-role-list}

> <badge>POST</badge> `/guild.member.role.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `user_id` | string | 用户 ID |
| `next` | string? | 分页令牌 |

获取群组内用户的角色列表。返回一个 [GuildRole](#def-guild-role) 的[分页列表](../protocol/api.md#list)。 -->

<!-- ### 获取群组角色 {#api-guild-role-get}

> <badge>POST</badge> `/guild.role.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `role_id` | string | 角色 ID |

获取群组角色。返回一个 [GuildRole](#def-guild-role) 对象。 -->

### 获取群组角色列表 {#api-guild-role-list}

> <badge>POST</badge> `/guild.role.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `next` | string? | 分页令牌 |

获取群组角色列表。返回一个 [GuildRole](#def-guild-role) 的[分页列表](../protocol/api.md#list)。

### 创建群组角色 {#api-guild-role-create}

> <badge>POST</badge> `/guild.role.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `role` | [GuildRole](#def-guild-role) | 角色数据 |

创建群组角色。返回一个 [GuildRole](#def-guild-role) 对象。

### 修改群组角色 {#api-guild-role-update}

> <badge>POST</badge> `/guild.role.update` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `role_id` | string | 角色 ID |
| `role` | [GuildRole](#def-guild-role) | 角色数据 |

修改群组角色。

### 删除群组角色 {#api-guild-role-delete}

> <badge>POST</badge> `/guild.role.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `guild_id` | string | 群组 ID |
| `role_id` | string | 角色 ID |

删除群组角色。

## 事件

### guild-role-created

群组角色被创建时触发。必需资源：[`guild`](./guild.md#def-guild)，[`role`](#def-guild-role)。

### guild-role-updated

群组角色被修改时触发。必需资源：[`guild`](./guild.md#def-guild)，[`role`](#def-guild-role)。

### guild-role-deleted

群组角色被删除时触发。必需资源：[`guild`](./guild.md#def-guild)，[`role`](#def-guild-role)。
