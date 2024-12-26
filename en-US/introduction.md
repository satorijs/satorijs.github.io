# Introduction

Satori is a universal chat protocol. We aim for Satori to bridge the differences between various chat platforms, enabling developers to create cross-platform, scalable, and high-performance chat applications at a lower cost.

The name "Satori" is inspired by the character Komeiji Satori from the game Touhou Project. Komeiji Satori can communicate with various animals through telepathy, and this name was chosen in the hope that Satori can serve as a bridge between different chat platforms.

The Satori development team has long been engaged in chatbot development and is familiar with the communication methods of various chat platforms. After four years of development, Satori has a robust design and mature implementation. Currently, Satori officially provides adapters for over 15 chat platforms, fully covering the world's mainstream chat platforms:

<div class="adapter-table">
  <a class="adapter">DingTalk</a>
  <a class="adapter">Discord</a>
  <a class="adapter">KOOK</a>
  <a class="adapter">Lark</a>
  <a class="adapter">LINE</a>
  <a class="adapter">Email</a>
  <a class="adapter">Matrix</a>
  <a class="adapter">QQ</a>
  <a class="adapter">Slack</a>
  <a class="adapter">Telegram</a>
  <a class="adapter">WeChat Official Account</a>
  <a class="adapter">WeCom</a>
  <a class="adapter">HoYoLAB</a>
  <a class="adapter">WhatsApp</a>
  <a class="adapter">Zulip</a>
</div>

These adapters not only provide an out-of-the-box experience but also practically demonstrate the universality and extensibility of the Satori protocol.

You don’t need to worry about losing control over chat platforms when using Satori. Thanks to Satori’s internal interface mechanism, you can write generic code in most cases and use internal interfaces to implement platform-specific features when needed.

Additionally, Satori offers a complete solution for large-scale scenarios. Whether it’s a chatbot on a personal computer or a chat platform backend on a distributed cluster, Satori can meet your needs.
