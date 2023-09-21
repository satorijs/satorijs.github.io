# 频道 (Channel)

## 类型定义

### Channel

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 频道 ID |
| name | string | 频道名称 |

## API

### 获取频道

> <badge>POST</badge>`/channel.get` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| channel_id | string | 频道 ID |

根据 ID 获取频道。返回一个 [Channel](#channel) 对象。

### 获取频道列表

> <badge>POST</badge>`/channel.list` {.route}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| guild_id | string | 群组 ID |
| next | string | 分页令牌 |

获取群组中的全部频道。返回一个 [Channel](#channel) 的 [分页列表](../protocol/api.md#分页)。

## 事件

### 频道可见
