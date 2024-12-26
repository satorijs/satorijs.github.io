# 介绍

Satori 是一个通用的聊天协议。我们希望 Satori 能够抹平不同聊天平台之间的差异，让开发者以更低的成本开发出跨平台、可扩展、高性能的聊天应用。

Satori 的名称来源于游戏东方 Project 中的角色 [古明地觉 (Komeiji Satori)](https://zh.touhouwiki.net/wiki/古明地觉)。古明地觉能够以心灵感应的方式与各种动物交流，取这个名字是希望 Satori 能够成为各个聊天平台之间的桥梁。

Satori 的开发团队长期从事聊天机器人开发，熟悉各种聊天平台的通信方式。经过长达 4 年的发展，Satori 有了健全的设计和完善的实现。目前，Satori 官方提供了超过 15 个聊天平台的适配器，完全覆盖了世界上主流的聊天平台：

<div class="adapter-table">
  <a class="adapter">钉钉</a>
  <a class="adapter">Discord</a>
  <a class="adapter">KOOK</a>
  <a class="adapter">飞书</a>
  <a class="adapter">LINE</a>
  <a class="adapter">邮件</a>
  <a class="adapter">Matrix</a>
  <a class="adapter">QQ</a>
  <a class="adapter">Slack</a>
  <a class="adapter">Telegram</a>
  <a class="adapter">微信公众号</a>
  <a class="adapter">企业微信</a>
  <a class="adapter">米游社</a>
  <a class="adapter">WhatsApp</a>
  <a class="adapter">Zulip</a>
</div>

这些适配器不仅为你带来了开箱即用的体验，也从实际上证明了 Satori 协议的通用性和扩展性。

不必担心使用 Satori 后会失去对聊天平台的控制。得益于 Satori 的内部接口机制，你完全可以大多数情况下编写通用代码，并在需要的时候使用内部接口来实现平台特定功能。

此外，Satori 还为规模化的场景提供了全套的解决方案。小到个人电脑上的聊天机器人，大到分布式集群上的聊天平台后端，Satori 都能满足你的需求。
