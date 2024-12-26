# 群组 (Guild)

## 类型定义

### Guild

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 群组 ID |
| name | string? | 群组名称 |
| avatar | string? | 群组头像 |

## API

### 获取群组 {#api-guild-get}

> <badge>POST</badge> `/guild.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |

根据 ID 获取。返回一个 [Guild](#guild) 对象。

### 获取群组列表 {#api-guild-list}

> <badge>POST</badge> `/guild.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| next | string? | 分页令牌 |

获取当前用户加入的全部群组。返回一个 [Guild](#guild) 的 [分页列表](../protocol/api.md#list)。

### 处理群组邀请 {#api-guild-approve}

> <badge>POST</badge> `/guild.approve` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| message_id | string | 请求 ID |
| approve | boolean | 是否通过请求 |
| comment | string? | 备注信息 |

处理来自群组的邀请。

## 事件

### guild-added

加入群组时触发。必需资源：`guild`。

### guild-updated

群组被修改时触发。必需资源：`guild`。

### guild-removed

退出群组时触发。必需资源：`guild`。

### guild-request

接收到新的入群邀请时触发。必需资源：`guild`。
