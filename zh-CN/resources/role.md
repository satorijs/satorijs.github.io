# 角色 (Role)

## 类型定义

### Role

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 角色 ID |
| name | string | 角色名称 |

## API

### 设置群组成员角色

> <badge>POST</badge>`/guild.member.role.set` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| user_id | string | 用户 ID |
| role_id | string | 角色 ID |

设置群组内用户的角色。

### 取消群组成员角色

> <badge>POST</badge>`/guild.member.role.unset` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| user_id | string | 用户 ID |
| role_id | string | 角色 ID |

取消群组内用户的角色。

### 获取群组角色列表

> <badge>POST</badge>`/guild.role.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| next | string? | 分页令牌 |

获取群组角色列表。

### 创建群组角色

> <badge>POST</badge>`/guild.role.create` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| role | [Role](#role) | 角色数据 |

创建群组角色。

### 修改群组角色

> <badge>POST</badge>`/guild.role.update` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| role_id | string | 角色 ID |
| role | [Role](#role) | 角色数据 |

修改群组角色。

### 删除群组角色

> <badge>POST</badge>`/guild.role.delete` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| role_id | string | 角色 ID |

删除群组角色。

## 事件

### guild-role-created

群组角色被创建时触发。

### guild-role-updated

群组角色被修改时触发。

### guild-role-deleted

群组角色被删除时触发。
