import{_ as n,y as l,p as e,X as d,z as r,l as i,aa as o,R as s,j as h}from"./chunks/framework.CIYb0pjC.js";const D=JSON.parse('{"title":"表态 (Reaction) 实验性","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/resources/reaction.md","filePath":"zh-CN/resources/reaction.md"}'),b={name:"zh-CN/resources/reaction.md"},p={id:"表态",tabindex:"-1"},u={class:"route"},m={class:"route"},f={class:"route"},g={class:"route"};function x(c,t,P,q,k,I){const a=s("badge");return h(),l("div",null,[e("h1",p,[t[1]||(t[1]=d("表态 (Reaction) ")),r(a,{type:"warning"},{default:i(()=>t[0]||(t[0]=[d("实验性")])),_:1}),t[2]||(t[2]=d()),t[3]||(t[3]=e("a",{class:"header-anchor",href:"#表态","aria-label":'Permalink to "表态 (Reaction) <badge type="warning">实验性</badge>"'},"​",-1))]),t[16]||(t[16]=e("h2",{id:"api",tabindex:"-1"},[d("API "),e("a",{class:"header-anchor",href:"#api","aria-label":'Permalink to "API"'},"​")],-1)),t[17]||(t[17]=e("h3",{id:"api-reaction-create",tabindex:"-1"},[d("添加表态 "),e("a",{class:"header-anchor",href:"#api-reaction-create","aria-label":'Permalink to "添加表态 {#api-reaction-create}"'},"​")],-1)),e("blockquote",u,[r(a,null,{default:i(()=>t[4]||(t[4]=[d("POST")])),_:1}),t[5]||(t[5]=d()),t[6]||(t[6]=e("code",null,"/reaction.create",-1))]),t[18]||(t[18]=o('<table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>频道 ID</td></tr><tr><td>message_id</td><td>string</td><td>消息 ID</td></tr><tr><td>emoji</td><td>string</td><td>表态名称</td></tr></tbody></table><p>向特定消息添加表态。</p><h3 id="api-reaction-delete" tabindex="-1">删除表态 <a class="header-anchor" href="#api-reaction-delete" aria-label="Permalink to &quot;删除表态 {#api-reaction-delete}&quot;">​</a></h3>',3)),e("blockquote",m,[r(a,null,{default:i(()=>t[7]||(t[7]=[d("POST")])),_:1}),t[8]||(t[8]=d()),t[9]||(t[9]=e("code",null,"/reaction.delete",-1))]),t[19]||(t[19]=o('<table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>频道 ID</td></tr><tr><td>message_id</td><td>string</td><td>消息 ID</td></tr><tr><td>emoji</td><td>string</td><td>表态名称</td></tr><tr><td>user_id</td><td>string?</td><td>用户 ID</td></tr></tbody></table><p>从特定消息删除某个用户添加的特定表态。如果没有传入用户 ID 则表示删除自己的表态。</p><h3 id="api-reaction-clear" tabindex="-1">清除表态 <a class="header-anchor" href="#api-reaction-clear" aria-label="Permalink to &quot;清除表态 {#api-reaction-clear}&quot;">​</a></h3>',3)),e("blockquote",f,[r(a,null,{default:i(()=>t[10]||(t[10]=[d("POST")])),_:1}),t[11]||(t[11]=d()),t[12]||(t[12]=e("code",null,"/reaction.clear",-1))]),t[20]||(t[20]=o('<table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>频道 ID</td></tr><tr><td>message_id</td><td>string</td><td>消息 ID</td></tr><tr><td>emoji</td><td>string?</td><td>表态名称</td></tr></tbody></table><p>从特定消息清除某个特定表态。如果没有传入表态名称则表示清除所有表态。</p><h3 id="api-reaction-list" tabindex="-1">获取表态列表 <a class="header-anchor" href="#api-reaction-list" aria-label="Permalink to &quot;获取表态列表 {#api-reaction-list}&quot;">​</a></h3>',3)),e("blockquote",g,[r(a,null,{default:i(()=>t[13]||(t[13]=[d("POST")])),_:1}),t[14]||(t[14]=d()),t[15]||(t[15]=e("code",null,"/reaction.list",-1))]),t[21]||(t[21]=o('<table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>频道 ID</td></tr><tr><td>message_id</td><td>string</td><td>消息 ID</td></tr><tr><td>emoji</td><td>string</td><td>表态名称</td></tr><tr><td>next</td><td>string?</td><td>分页令牌</td></tr></tbody></table><p>获取添加特定消息的特定表态的用户列表。返回一个 <a href="./user.html#def-user"><code>User</code></a> 的 <a href="./../protocol/api.html#list">分页列表</a>。</p><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><h3 id="reaction-added" tabindex="-1">reaction-added <a class="header-anchor" href="#reaction-added" aria-label="Permalink to &quot;reaction-added&quot;">​</a></h3><p>当表态被添加时触发。</p><h3 id="reaction-removed" tabindex="-1">reaction-removed <a class="header-anchor" href="#reaction-removed" aria-label="Permalink to &quot;reaction-removed&quot;">​</a></h3><p>当表态被移除时触发。</p>',7))])}const N=n(b,[["render",x]]);export{D as __pageData,N as default};