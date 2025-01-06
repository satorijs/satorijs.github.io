import{_ as i,y as n,aa as d,p as t,z as r,l as o,X as a,R as l,j as h}from"./chunks/framework.CIYb0pjC.js";const E=JSON.parse('{"title":"Message","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/resources/message.md","filePath":"en-US/resources/message.md"}'),m={name:"en-US/resources/message.md"},u={class:"route"},g={class:"route"},c={class:"route"},f={class:"route"},p={class:"route"};function b(q,e,P,x,T,I){const s=l("badge");return h(),n("div",null,[e[15]||(e[15]=d('<h1 id="message" tabindex="-1">Message <a class="header-anchor" href="#message" aria-label="Permalink to &quot;Message&quot;">​</a></h1><h2 id="definitions" tabindex="-1">Definitions <a class="header-anchor" href="#definitions" aria-label="Permalink to &quot;Definitions&quot;">​</a></h2><h3 id="def-message" tabindex="-1">Message <a class="header-anchor" href="#def-message" aria-label="Permalink to &quot;Message {#def-message}&quot;">​</a></h3><table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>message id</td></tr><tr><td>content</td><td>string</td><td>message content</td></tr><tr><td>channel</td><td><a href="./channel.html#def-channel">Channel</a>?</td><td>channel object</td></tr><tr><td>guild</td><td><a href="./guild.html#def-guild">Guild</a>?</td><td>guild object</td></tr><tr><td>member</td><td><a href="./member.html#def-guild-member">GuildMember</a>?</td><td>guild member object</td></tr><tr><td>user</td><td><a href="./user.html#def-user">User</a>?</td><td>user object</td></tr><tr><td>created_at</td><td>number?</td><td>timestamp of message creation</td></tr><tr><td>updated_at</td><td>number?</td><td>timestamp of message update</td></tr></tbody></table><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="api-message-create" tabindex="-1">Create Message <a class="header-anchor" href="#api-message-create" aria-label="Permalink to &quot;Create Message {#api-message-create}&quot;">​</a></h3>',6)),t("blockquote",u,[r(s,null,{default:o(()=>e[0]||(e[0]=[a("POST")])),_:1}),e[1]||(e[1]=a()),e[2]||(e[2]=t("code",null,"/message.create",-1))]),e[16]||(e[16]=d('<table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>channel id</td></tr><tr><td>content</td><td>string</td><td>message content</td></tr></tbody></table><p>Send (create) a message. Returns an array of <a href="#def-message">Message</a> objects.</p><h3 id="api-message-get" tabindex="-1">Get Message <a class="header-anchor" href="#api-message-get" aria-label="Permalink to &quot;Get Message {#api-message-get}&quot;">​</a></h3>',3)),t("blockquote",g,[r(s,null,{default:o(()=>e[3]||(e[3]=[a("POST")])),_:1}),e[4]||(e[4]=a()),e[5]||(e[5]=t("code",null,"/message.get",-1))]),e[17]||(e[17]=d('<table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>channel id</td></tr><tr><td>message_id</td><td>string</td><td>message id</td></tr></tbody></table><p>Get a message by id. Returns a <a href="#def-message">Message</a> object. Required resources: <a href="./channel.html#def-channel"><code>channel</code></a>, <a href="./user.html#def-user"><code>user</code></a>.</p><h3 id="api-message-delete" tabindex="-1">Delete Message <a class="header-anchor" href="#api-message-delete" aria-label="Permalink to &quot;Delete Message {#api-message-delete}&quot;">​</a></h3>',3)),t("blockquote",c,[r(s,null,{default:o(()=>e[6]||(e[6]=[a("POST")])),_:1}),e[7]||(e[7]=a()),e[8]||(e[8]=t("code",null,"/message.delete",-1))]),e[18]||(e[18]=d('<table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>channel id</td></tr><tr><td>message_id</td><td>string</td><td>message id</td></tr></tbody></table><p>Delete a specific message.</p><h3 id="api-message-update" tabindex="-1">Update Message <a class="header-anchor" href="#api-message-update" aria-label="Permalink to &quot;Update Message {#api-message-update}&quot;">​</a></h3>',3)),t("blockquote",f,[r(s,null,{default:o(()=>e[9]||(e[9]=[a("POST")])),_:1}),e[10]||(e[10]=a()),e[11]||(e[11]=t("code",null,"/message.update",-1))]),e[19]||(e[19]=d('<table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>channel id</td></tr><tr><td>message_id</td><td>string</td><td>message id</td></tr><tr><td>content</td><td>string</td><td>message content</td></tr></tbody></table><p>Edit (update) a specific message.</p><h3 id="api-message-list" tabindex="-1">Get Message List <a class="header-anchor" href="#api-message-list" aria-label="Permalink to &quot;Get Message List {#api-message-list}&quot;">​</a></h3>',3)),t("blockquote",p,[r(s,null,{default:o(()=>e[12]||(e[12]=[a("POST")])),_:1}),e[13]||(e[13]=a()),e[14]||(e[14]=t("code",null,"/message.list",-1))]),e[20]||(e[20]=d('<table tabindex="0"><thead><tr><th>FIELD</th><th>TYPE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>channel id</td></tr><tr><td>message_id</td><td>string</td><td>message id</td></tr><tr><td>next</td><td>string?</td><td>pagination token</td></tr><tr><td>direction</td><td><a href="./../protocol/api.html#bidi-list">Direction</a>?</td><td>query direction</td></tr><tr><td>limit</td><td>number?</td><td>result limit</td></tr><tr><td>order</td><td><a href="./../protocol/api.html#bidi-list">Order</a>?</td><td>result order</td></tr></tbody></table><p>Get the list of messages in a channel. Returns a <a href="./../protocol/api.html#bidi-list">bidirectional paginated list</a> of Message objects. Required resource: <a href="./user.html#def-user"><code>user</code></a>.</p><ul><li>The <code>next</code> parameter defaults to null, indicating the query starts from the latest message. In this case, the <code>direction</code> parameter can only be <code>before</code>.</li><li>The <code>direction</code> parameter defaults to <code>before</code>.</li><li>The <code>order</code> parameter defaults to <code>asc</code> (regardless of query direction).</li><li>The default value of the <code>limit</code> parameter aligns with the platform&#39;s default. If the platform API does not specify a default, it can be set independently, with a recommended value of 50. If the user-provided value exceeds the platform&#39;s limit, the platform&#39;s upper limit should be used instead of returning an error. Developers should use the presence of <code>prev</code> or <code>next</code> in the response to determine if more data exists, rather than relying on the length of the <code>data</code> in the response.</li></ul><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="message-created" tabindex="-1">message-created <a class="header-anchor" href="#message-created" aria-label="Permalink to &quot;message-created&quot;">​</a></h3><p>Triggered when a message is created. Required resources: <a href="./channel.html#def-channel"><code>channel</code></a>, <a href="#def-message"><code>message</code></a>, <a href="./user.html#def-user"><code>user</code></a>.</p><h3 id="message-updated" tabindex="-1">message-updated <a class="header-anchor" href="#message-updated" aria-label="Permalink to &quot;message-updated&quot;">​</a></h3><p>Triggered when a message is updated. Required resources: <a href="./channel.html#def-channel"><code>channel</code></a>, <a href="#def-message"><code>message</code></a>, <a href="./user.html#def-user"><code>user</code></a>.</p><h3 id="message-deleted" tabindex="-1">message-deleted <a class="header-anchor" href="#message-deleted" aria-label="Permalink to &quot;message-deleted&quot;">​</a></h3><p>Triggered when a message is deleted. Required resources: <a href="./channel.html#def-channel"><code>channel</code></a>, <a href="#def-message"><code>message</code></a>, <a href="./user.html#def-user"><code>user</code></a>.</p>',10))])}const k=i(m,[["render",b]]);export{E as __pageData,k as default};