# Message Encoding

Messages in Satori are encoded using **Message Elements**. 

## Syntax

The syntax of message elements is similar to XHTML but not identical.

### Characters

You can use any character within message elements. However, some special characters need to be escaped:

| Original Character | Escaped Form |
| :---: | :---: |
| `"` |`&quot;`|
| `&` |`&amp;`|
| `<` |`&lt;`|
| `>` |`&gt;`|

Depending on the context, some characters may not need to be escaped or may use different escape methods.

Additionally, you can escape any character using decimal or hexadecimal notation. For example, `'` can also be written as `&#39;` or `&#x27;`.

### Tags

A tag is formed by enclosing an element name in a pair of angle brackets, along with optional attributes and a closing indicator.

Element names consist of lowercase letters, numbers, and hyphens, and must start with a letter. Adding `/` before or after the element name indicates an end tag or a self-closing tag, while the absence of `/` indicates a start tag:

- `<tag>`: A start tag
- `</tag>`: An end tag
- `<tag/>`: A self-closing tag

### Attributes

The element name in a start or self-closing tag can be followed by an optional list of attributes. Each attribute must take one of the following forms:

- `key`
- `key="value"` (where `"` in `value` needs to be escaped)
- `key='value'` (where `'` in `value` needs to be escaped)

Here is an example:

```html
<tag foo="1" bar/>
```

### Elements

An element is either a self-closing tag or consists of a pair of start and end tags with the same name. The content of an element refers to the part between the start and end tags, which can include text content or other elements. For self-closing tags, the content is empty. Here is an example:

```html
<parent>
  text content
  <child/>
</parent>
```

When unpaired elements exist, they are automatically treated as part of the text content. If there are continuous whitespace characters (including line breaks) before or after the text content, they will be ignored. This means the following two code snippets are equivalent:

```html
<tag>
  <foo> bar
  <!-- comment -->
</tag>
```

```html
<tag>&lt;foo&gt; bar</tag>
```

### Comments

Use paired `<!--` and `-->` to insert a comment. The content within comments will not be rendered.

## Standard Elements

For the built-in message elements in Satori, please refer to Standard Elements.
