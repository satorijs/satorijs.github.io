# HTTP API

## Pagination

Some API may return a list of items. In this case, the response will be a `List` object:

| FIELD | DESCRIPTION |
| ----- | ----------- |
| `items` | list of items |
| `next` | token for the next page |

You can use the `next` token to get the next page of items. If `next` is nullable, there are no more items.
