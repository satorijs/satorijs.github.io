# 群组角色 (GuildRole)

## 类型定义

### GuildRole

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 角色 ID |
| name | string | 角色名称 |

## API

### bot.setGuildMemberRole(guildId, userId, roleId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

设置群组内用户的角色。

### bot.unsetGuildMemberRole(guildId, userId, roleId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

取消群组内用户的角色。

### bot.getGuildRoleList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<GuildRole>>` 角色列表

获取群组角色列表。

### bot.createGuildRole(guildId, data)

- **guildId:** `string` 群组 ID
- **data:** `Partial<GuildRole>` 角色信息
- 返回值: `Promise<string>` 角色 ID

创建群组角色。

### bot.modifyGuildRole(guildId, roleId, data)

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- **data:** `Partial<GuildRole>` 角色信息
- 返回值: `Promise<void>`

修改群组角色。

### bot.deleteGuildRole(guildId, roleId)

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

删除群组角色。

## 事件

### guild-role-created

群组角色被创建时触发。包含一个 [GuildRole](#guildrole) 对象。

### guild-role-updated

群组角色被修改时触发。包含一个 [GuildRole](#guildrole) 对象。

### guild-role-deleted

群组角色被删除时触发。包含一个 [GuildRole](#guildrole) 对象，部分属性可能缺失。
