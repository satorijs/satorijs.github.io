# 频道 (Channel)

## 类型定义

```ts
export interface Channel {
  id: string
  name: string
}
```

## API

### bot.getChannel(channelId)

- **channelId:** `string` 频道 ID
- 返回值: `Promise<Channel>` 频道信息

获取频道信息。

### bot.getChannelList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<Channel>>` 频道列表

获取某个群组的频道列表。
