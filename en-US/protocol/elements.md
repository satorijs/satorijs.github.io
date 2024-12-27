# Standard Elements

## Basic Elements

Basic elements are the most common message elements. They can be displayed normally on most platforms and are the fundamental units of messages.

### Mention User (at) {#at}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| id | string? | S/R | target user id |
| name | string? | S/R | target user name |
| role | string? | S/R | target roke |
| type | string? | S/R | special operations, such as `all` for mentioning all members, `here` for mentioning online members |

The `<at>` element is used to mention a user or users.

### Mention Channel (sharp) {#sharp}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| id | string | S/R | target channel id |
| name | string? | S/R | target channel name |

The `<sharp>` element is used to mention a channel.

### Link (a) {#a}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| href | string | S/R | url of the link |

The `<a>` element is used to display a link. If the platform does not support links, it is recommended to display it in the form of content (href).

## Resource Elements

Resource message elements represent resource files in the text. Different platforms have significant differences in their support for resource files. When sending, only `src` needs to be provided. If a platform does not support a specific resource type, the adapter should replace it with `src`. If a platform does not support sending resource message elements and other message elements simultaneously, the adapter should send them in multiple messages.

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| src | string | S/R | url of the resource |
| title | string? | S/R | name of the resource file |
| cache <badge type="warning">experimental</badge> | boolean? | S | whether to use cached files |
| timeout <badge type="warning">experimental</badge> | number? | S | maximum time to download the file (in milliseconds) |

### Image (img) {#img}

In addition to the common attributes above, the following attributes are supported:

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| width | number? | R | image width (in pixels) |
| height | number? | R | image width (in pixels) |

The `<img>` element is used to represent an image.

### Audio (audio) {#audio}

In addition to the common attributes above, the following attributes are supported:

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| Attribute | number? | S/R | audio length (in seconds) |
| poster | string? | S/R | url of the audio cover |

The `<audio>` element is used to represent audio.

### Video (video) {#video}

In addition to the common attributes above, the following attributes are supported:

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| width | number? | R | video width (in pixels) |
| height | number? | R | video width (in pixels) |
| Attribute | number? | S/R | video length (in seconds) |
| poster | string? | S/R | url of the video cover |

The `<video>` element is used to represent a video.

### File (file) {#file}

In addition to the common attributes above, the following attributes are supported:

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| poster | string? | S/R | url of the thumbnail |

The `<file>` element is used to represent a file.

## Decorative Elements

Decorative elements are used to modify their content. If the corresponding platform does not support the element, the element itself can be ignored, and its child elements can be rendered normally.

### Bold (b, strong) {#b}

The `<b>` or `<strong>` element is used to display its content in bold.

### Italic (i, em) {#i}

The `<i>` or `<em>` element is used to display its content in italics.

### Underline (u, ins) {#u}

The `<u>` or `<ins>` element is used to underline its content.

### Strikethrough (s, del) {#s}

The `<s>` or `<del>` element is used to strikethrough its content.

### Spoiler (spl) {#spl}

The `<spl>` element is used to mark its content as a spoiler (hidden by default, revealed upon clicking).

### Code (code) {#code}

The `<code>` element is used to display its content in a monospaced font (usually with a specific background color).

### Superscript (sup) {#sup}

The `<sup>` element is used to display its content as superscript.

### Subscript (sub) {#sub}

The `<sub>` element is used to display its content as subscript.

## Layout Elements

### Line Break (br) {#br}

The `<br>` element represents an independent line break.

### Paragraph (p) {#p}

The `<p>` element represents a paragraph. When rendering, it ensures a line break between itself and adjacent elements.

### Message (message) {#message}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| id | string? | S | message id |
| forward | boolean? | S | whether it is a forwarded messasge |

The basic usage of the `<message>` element is to represent a message. Its child elements correspond to the message's content. If it has no child elements, the message will not be sent.

When a `<message>` element appears, the preceding elements are immediately treated as a message and sent. Therefore, the following two approaches are equivalent:

```html
<!-- First approach: Send two messages -->
<message>hello</message>
<message>world</message>

<!-- Second approach: Use an empty message to separate two pieces of text, but it still sends two messages -->
hello<message/>world
```

Some platforms allow you to simulate messages sent by other users:

```html
<message>
  <author id="123123123" name="Alice" avatar="url"/>
  hello world
</message>
```

On platforms that support forwarding, you can use forward with the id attribute to forward a message:

```html
<message id="123456789" forward/>
```

On platforms that support combined forwarding, you can use the `<message>` element with the forward attribute to nest other `<message>` elements for combined forwarding:

```html
<message forward>
  <message id="123456789"/>
  <message id="987654321"/>
  <!-- You can also nest simulated messages from other users in combined forwarding -->
  <message>
    <author id="123123123" name="Alice" avatar="url"/>
    hello world
  </message>
</message>
```

## Meta Elements

Meta elements are usually not rendered but affect the behavior of message sending.

### Quote (quote) {#quote}

The `<quote>` element is used to represent a message quote. Its child elements will be rendered as the quoted content. In theory, all features of the `<message>` element can also be used in the `<quote>` element, including child elements (to construct quoted messages) and the forward attribute (to quote combined forwarding). However, currently, no platform seems to support this.

### Author (author) {#author}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| id | string? | S | user id |
| name | string? | S | user name |
| avatar | string? | S | avatar url |

The `<author>` element is used to represent the author of a message. Its child elements will be rendered as the author's name.

## Interactive Elements

Interactive elements are used to display interactive content in messages. If the platform does not support such elements and cannot provide a fallback, the entire element can be ignored. The implementation should return messages with or without interactivity based on platform features.

### Button (button) <badge type="warning">experimental</badge> {#button}

| ATTRIBUTE | TYPE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- |
| id | string? | S | button id |
| type | string? | S | button type |
| link | string? | S | button link |
| text | string? | S | text to input |
| theme | string? | S | button style |

The `<button>` element is used to represent a button. Its child elements will be rendered as the button's text.

Buttons currently support three different types:

- Clicking an `action` button triggers an `interaction/button` event, and the button resource of the event will contain the above `id`.
- Clicking a `link` button opens a link, and the link's address is the above `href`.
- Clicking an `input` button fills the user's input box with the above `text`.

`theme` is recommended to use only the following values:

- primary
- secondary
- success
- warning
- danger
- info

