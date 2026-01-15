# 交互 (Interaction) <badge type="warning">实验性</badge>

::: tip
交互功能主要通过机器人提供，并由用户在聊天应用中触发。如果你要实现或接入的聊天平台不支持机器人相关功能，那么可以直接忽略本节。
:::

## 类型定义

### Argv {#def-argv}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 指令名称 |
| `arguments` | array | 参数 |
| `options` | object | 选项 |

### Button {#def-button}

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `id` | string | 按钮 ID |

## 事件

### interaction/button

类型为 `action` 的按钮被点击时触发。必需资源：[`button`](#def-button)。

### interaction/command

调用斜线指令时触发。资源 [`argv`](#def-argv) 或 [`message`](./message.md#def-message) 中至少包含其一。

::: tip
许多平台都支持斜线指令，但它们的实现方式各不相同。如果平台的斜线指令仅仅提供在前端，机器人无法直接判断一个事件是否为斜线指令调用，那么直接实现为普通消息事件即可。
:::
