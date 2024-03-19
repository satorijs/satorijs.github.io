# 群组成员 (GuildMember)

## 类型定义

### GuildMember

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| user | [User](./user.md#user)? | 用户对象 |
| nick | string? | 用户在群组中的名称 |
| avatar | string? | 用户在群组中的头像 |
| joined_at | number? | 加入时间 |

## API

### 获取群组成员

> <badge>POST</badge>`/guild.member.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| user_id | string | 用户 ID |

获取群成员信息。返回一个 [GuildMember](#guildmember) 对象。

### 获取群组成员列表

> <badge>POST</badge>`/guild.member.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| next | string? | 分页令牌 |

获取群成员列表。返回一个 [GuildMember](#guildmember) 的 [分页列表](../protocol/api.md#分页)。

### 踢出群组成员

> <badge>POST</badge>`/guild.member.kick` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| user_id | string | 用户 ID |
| permanent | boolean? | 是否永久踢出 (无法再次加入群组) |

将某个用户踢出群组。

### 禁言群组成员 <badge type="warning">实验性</badge>

> <badge>POST</badge>`/guild.member.mute` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| user_id | string | 用户 ID |
| duration | number | 禁言时长 (毫秒) |

将某个用户禁言。如果传入的禁言时长为 `0` 则表示解除禁言。

### 通过群组成员申请

> <badge>POST</badge>`/guild.member.approve` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| message_id | string | 请求 ID |
| approve | boolean | 是否通过请求 |
| comment | string? | 备注信息 |

处理加群请求。

## 事件

### guild-member-added

群组成员增加时触发。必需资源：`guild`，`member`，`user`。

### guild-member-updated

群组成员信息更新时触发。必需资源：`guild`，`member`，`user`。

### guild-member-removed

群组成员移除时触发。必需资源：`guild`，`member`，`user`。

### guild-member-request

接收到新的加群请求时触发。必需资源：`guild`，`member`，`user`。
