# Overview

The communication methods of the Satori protocol are divided into two parts:

- A set of HTTP-based API services for sending messages and invoking other functionalities.
- A set of event services based on WebSocket or WebHook for receiving messages and other events.

## Core Concepts

Before we begin, let’s familiarize ourselves with some core concepts related to Satori.

**SDK** refers to software that implements the Satori protocol. **Application** refers to software that integrates with the Satori protocol. Applications communicate with the SDK to enable functionalities of chat platforms.

**Platform** refers to chat platforms, such as Discord, Telegram, etc. Users within the same platform can send messages to each other, while users across different platforms cannot. For self-hosted chat platforms like Rocket Chat, each independent server is considered a different platform.

**Message** is literally a message. It is usually in text or rich text format and may sometimes include media resources such as images or voice. In Satori, messages are uniformly encoded using message elements.

**Channel** is a collection of messages. A channel contains a series of messages with a temporal and logical order. Channels are divided into private channels and group channels. Private channels involve exactly two participants, while group channels can have any number of participants.

**Guild** is a collection of platform users. A guild typically includes a group of users and channels, with a permission mechanism allowing some users to manage it. On some platforms, the concepts of guilds and group channels coincide (e.g., QQ): a guild has exactly one group channel. Private channels do not belong to any guild.

## Optional Fields

Due to differences in platform implementations, most fields in the Satori protocol are optional. Optional fields are marked with a `?` after their type.

For any optional field, the result of the relevant API call may either omit the field or have its value as `null`. The former indicates that the API does not provide this field, though it may be provided by other APIs; the latter indicates that the API provides this field, but its value is `null`.

## Resources

Resources in the Satori protocol refer to objects with a defined structure. For example, [User](../resources/user.md), [Channel](../resources/channel.md), [Message](../resources/member.md), etc., are all resources. Some events and API responses include these resource objects.

A field in a resource object can be another resource object. For example, the `user` field in a message object is a user object. When resource objects are nested at multiple levels, the inner resources are uniformly promoted to the outermost layer. For instance, when a message event is received, the event body can access resources such as `message`, `member`, `user`, and `channel`, but the `message` object will no longer contain the `member` and `user` fields.
