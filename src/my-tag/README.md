# My Tag Component

A simple click counter component built with ServiceNow UI Framework.

## Features

- **Increment Button**: Increases the tally count by 1
- **Clear Button**: Resets the tally count to 0
- **Real-time Display**: Shows the current tally value
- **Event Dispatching**: Dispatches `TALLY_CHANGED` event when the tally property changes

## Usage

```html
<my-tag></my-tag>
```

## Properties

- `tally` (Number, default: 0): The current count value

## Events

- `TALLY_CHANGED`: Dispatched whenever the tally property changes, includes the new tally value in the payload

## Example

```javascript
// Set initial tally value
<my-tag tally="5"></my-tag>
```
