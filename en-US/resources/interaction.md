# Interaction <badge type="warning">Experimental</badge>

::: tip
Interaction features are primarily provided by bots and triggered by users in chat applications. If the chat platform you are implementing or integrating does not support bot-related features, you can safely ignore this section.
:::

## Definitions

### Argv {#def-argv}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| name | string | command name |
| arguments | array | arguments |
| options | object | options |

### Button {#def-button}

| FIELD | TYPE | DESCRIPTION |
| ----- | ---- | ----------- |
| id | string | button id |

## Events

### interaction/button

Triggered when a button of type `action` is clicked. Required resource: [`button`](#def-button).

### interaction/command

Triggered when a slash command is invoked. At least one of the resources [`argv`](#def-argv) or `message` must be included.

::: tip
Many platforms support slash commands, but their implementations vary. If the platform’s slash commands are only provided on the frontend and the bot cannot directly determine whether an event is a slash command invocation, it can be treated as a regular message event.
:::
