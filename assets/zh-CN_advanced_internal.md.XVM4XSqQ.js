import{_ as a,y as i,aa as e,j as s}from"./chunks/framework.CIYb0pjC.js";const k=JSON.parse('{"title":"跨平台","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/advanced/internal.md","filePath":"zh-CN/advanced/internal.md"}'),d={name:"zh-CN/advanced/internal.md"};function o(l,t,n,r,p,c){return s(),i("div",null,t[0]||(t[0]=[e(`<h1 id="跨平台" tabindex="-1">跨平台 <a class="header-anchor" href="#跨平台" aria-label="Permalink to &quot;跨平台&quot;">​</a></h1><p>作为一个跨平台的聊天协议，Satori 提供了访问任意平台原生接口的能力。这意味着，你可以大多数情况下编写通用代码，并在需要的时候使用原生接口来实现平台特定功能。</p><p>这些原生能力被统称为内部接口，涵盖了 API、事件、消息元素、路由等各个方面。</p><h2 id="platform-vs-adapter" tabindex="-1">平台与适配器 <a class="header-anchor" href="#platform-vs-adapter" aria-label="Permalink to &quot;平台与适配器 {#platform-vs-adapter}&quot;">​</a></h2><p>Satori 协议的大多数 API 都需要传入 <code>Satori-Platform</code> 和 <code>Satori-User-ID</code> 请求头，这是为了区分发起请求的登录号。不同平台的登录号拥有不同的 <code>login.platform</code>，而同一平台的不同登录号则拥有不同的 <code>login.user.id</code>，由此这套机制实现了安全的隔离。</p><p>大多数聊天平台的 <code>platform</code> 字段都是直接由 SDK 设置的固定值。然而对于另一些允许自建的平台 (例如 Rocket Chat 和 Zulip)，SDK 则通常需要让部署者自行设置 <code>platform</code>，用来区分不同的服务器。如果直接混用的话，可能导致数据碰撞等问题。</p><p>所以对于任何一个 Login，我们实际上存在两个不同的概念：</p><ul><li><p><code>login.platform</code>：聊天平台。通常来说，同一平台内的用户间具有相互发送消息的能力，而不同平台的用户间则没有。在 Satori 中，<code>platform</code> 也相当于一种命名空间，因此 SDK 需要保证同一平台内的 <code>user.id</code>, <code>guild.id</code> 等字段的唯一性。</p></li><li><p><code>login.adapter</code>：适配器。适配器更多地是一个实现相关的概念，它决定了如何与平台进行通信。同一个适配器下通常会有相同的扩展 API、事件和消息元素。这个字段通常是 SDK 直接设置的，开发者可以用这个字段判断实现是否支持某些特性。</p></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果你读到这里仍然难以区分 <code>platform</code> 和 <code>adapter</code>，可以记住以下规则：</p><ul><li>同一 <code>platform</code> 内 ID 相互兼容；</li><li>同一 <code>adapter</code> 内 API 相互兼容；</li></ul><p>这两个条件是充分但不必要的，换言之，即便两个 Login 所拥有的 ID 或者 API 兼容，也可以不使用相同的 <code>platform</code> 或 <code>adapter</code>。这完全取决于 SDK 的实现和社区的约定。</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>需要注意的是，这两个概念实际上是多对多的，我们可以举出一些特殊场景：</p><ul><li><strong>单适配器多平台</strong>：某平台允许用户自建服务器，此时两台独立的自建服务器拥有不同的数据，所有的 <code>user.id</code>, <code>guild.id</code> 等属于不同的命名空间，因此 <code>platform</code> 字段应该是不同的。但这两台服务器使用的通信方式相同，因此 <code>adapter</code> 字段应该是相同的。</li><li><strong>单平台多适配器</strong>：某平台同时有官方和非官方的 SDK，两套 SDK 使用的通信方式不同，因此 <code>adapter</code> 字段应该是不同的。但这两套 SDK 都是为了与同一平台通信，所有的 <code>user.id</code>, <code>guild.id</code> 等属于同一个命名空间，因此 <code>platform</code> 字段应该是相同的。</li></ul></div><h2 id="api" tabindex="-1">API 扩展 <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API 扩展 {#api}&quot;">​</a></h2><p>SDK 可以通过 <code>/{path}/{version}/internal/{method}</code> 路由代理平台原生 API。</p><p>例如，Discord 平台提供了 Restful API，那么你可以进行如下请求：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>DELETE /v1/internal/channels/111222333</span></span>
<span class="line"><span>Satori-Platform: discord</span></span>
<span class="line"><span>Satori-User-ID: 1234567890</span></span></code></pre></div><p>除了作为前缀的路由和额外的 <code>Satori-Platform</code> 和 <code>Satori-User-ID</code> 请求头之外，整个请求和响应的格式都与平台原生 API 一致。</p><h2 id="events" tabindex="-1">事件扩展 <a class="header-anchor" href="#events" aria-label="Permalink to &quot;事件扩展 {#events}&quot;">​</a></h2><h3 id="平台原生事件" tabindex="-1">平台原生事件 <a class="header-anchor" href="#平台原生事件" aria-label="Permalink to &quot;平台原生事件&quot;">​</a></h3><p>SDK 可以通过 <code>internal</code> 事件的 <code>_type</code> 和 <code>_data</code> 属性代理平台原生事件。它的结构如下：</p><table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>sn</code></td><td>number</td><td>事件序列号</td></tr><tr><td><code>type</code></td><td>string</td><td>事件类型 (固定为 <code>internal</code>)</td></tr><tr><td><code>login</code></td><td><a href="./../resources/login.html">Login</a></td><td>登录信息</td></tr><tr><td><code>_type</code></td><td>string</td><td>原生事件类型</td></tr><tr><td><code>_data</code></td><td>object</td><td>原生事件数据</td></tr></tbody></table><h3 id="标准事件的扩展字段" tabindex="-1">标准事件的扩展字段 <a class="header-anchor" href="#标准事件的扩展字段" aria-label="Permalink to &quot;标准事件的扩展字段&quot;">​</a></h3><p>标准事件的平台原生字段也可以通过上述 <code>_type</code> 和 <code>_data</code> 访问。它的结构如下：</p><table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>type</code></td><td>string</td><td>事件类型 (不应该是 <code>internal</code>)</td></tr><tr><td><code>_type</code></td><td>string</td><td>平台通用名称</td></tr><tr><td><code>_data</code></td><td>object</td><td>原生事件数据</td></tr><tr><td>其他字段</td><td></td><td>其他标准事件字段</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>有些平台原生事件可以直接对应到标准事件。当这些事件触发时，SDK 可以同时触发标准事件和平台原生事件。这两个事件都带有 <code>_type</code> 和 <code>_data</code> 字段，但这两个字段的值可能是不同的。</p></div><h2 id="elements" tabindex="-1">消息元素扩展 <a class="header-anchor" href="#elements" aria-label="Permalink to &quot;消息元素扩展 {#elements}&quot;">​</a></h2><h3 id="平台原生消息元素" tabindex="-1">平台原生消息元素 <a class="header-anchor" href="#平台原生消息元素" aria-label="Permalink to &quot;平台原生消息元素&quot;">​</a></h3><p>平台可以提供原生消息元素，但需要加上适配器名称作为前缀。下面是一个例子：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">kook:card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> size</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;lg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">kook:countdown</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> end-time</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1608819168000&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">kook:card</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre></div><h3 id="标准元素的扩展属性" tabindex="-1">标准元素的扩展属性 <a class="header-anchor" href="#标准元素的扩展属性" aria-label="Permalink to &quot;标准元素的扩展属性&quot;">​</a></h3><p>标准元素的平台原生属性也可以通过加上适配器名称作为前缀的方式声明。下面是一个例子：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- src 是 audio 元素的标准属性。 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">&lt;!-- 但 cover 并未标准化，所以需要加前缀。 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">audio</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;url1&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> kook:cover</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;url2&quot;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FFFFFF;--shiki-dark-font-style:inherit;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>平台原生消息元素的属性是否需要前缀由 SDK 实现自行决定。如果某个消息元素希望在未来标准化，那么加上前缀可以降低迁移成本。如果没有标准化需要，那么去掉前缀在书写上更方便。</p></div>`,31)]))}const g=a(d,[["render",o]]);export{k as __pageData,g as default};