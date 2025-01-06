import{_ as r,y as d,p as e,X as a,z as n,l as i,aa as s,R as c,j as l}from"./chunks/framework.CIYb0pjC.js";const k=JSON.parse('{"title":"交互 (Interaction) 实验性","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/resources/interaction.md","filePath":"zh-CN/resources/interaction.md"}'),h={name:"zh-CN/resources/interaction.md"},b={id:"交互",tabindex:"-1"};function u(m,t,p,f,g,v){const o=c("badge");return l(),d("div",null,[e("h1",b,[t[1]||(t[1]=a("交互 (Interaction) ")),n(o,{type:"warning"},{default:i(()=>t[0]||(t[0]=[a("实验性")])),_:1}),t[2]||(t[2]=a()),t[3]||(t[3]=e("a",{class:"header-anchor",href:"#交互","aria-label":'Permalink to "交互 (Interaction) <badge type="warning">实验性</badge>"'},"​",-1))]),t[4]||(t[4]=s('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>交互功能主要通过机器人提供，并由用户在聊天应用中触发。如果你要实现或接入的聊天平台不支持机器人相关功能，那么可以直接忽略本节。</p></div><h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h2><h3 id="def-argv" tabindex="-1">Argv <a class="header-anchor" href="#def-argv" aria-label="Permalink to &quot;Argv {#def-argv}&quot;">​</a></h3><table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>name</td><td>string</td><td>指令名称</td></tr><tr><td>arguments</td><td>array</td><td>参数</td></tr><tr><td>options</td><td>object</td><td>选项</td></tr></tbody></table><h3 id="def-button" tabindex="-1">Button <a class="header-anchor" href="#def-button" aria-label="Permalink to &quot;Button {#def-button}&quot;">​</a></h3><table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>按钮 ID</td></tr></tbody></table><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><h3 id="interaction-button" tabindex="-1">interaction/button <a class="header-anchor" href="#interaction-button" aria-label="Permalink to &quot;interaction/button&quot;">​</a></h3><p>类型为 <code>action</code> 的按钮被点击时触发。必需资源：<a href="#def-button"><code>button</code></a>。</p><h3 id="interaction-command" tabindex="-1">interaction/command <a class="header-anchor" href="#interaction-command" aria-label="Permalink to &quot;interaction/command&quot;">​</a></h3><p>调用斜线指令时触发。资源 <a href="#def-argv"><code>argv</code></a> 或 <a href="./message.html#def-message"><code>message</code></a> 中至少包含其一。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>许多平台都支持斜线指令，但它们的实现方式各不相同。如果平台的斜线指令仅仅提供在前端，机器人无法直接判断一个事件是否为斜线指令调用，那么直接实现为普通消息事件即可。</p></div>',12))])}const q=r(h,[["render",u]]);export{k as __pageData,q as default};