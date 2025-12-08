# ServiceNow Component Development Guide

This guide explains the key concepts and implementation details of the `seismic-data-display` component, based on the [ServiceNow Next Experience UI Framework documentation](https://developer.servicenow.com/dev.do#!/reference/next-experience/zurich/ui-framework/main-concepts/component).

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [Main Concepts](#main-concepts)
3. [Implementation Details](#implementation-details)
4. [Best Practices](#best-practices)
5. [Common Patterns](#common-patterns)

---

## Component Architecture

### File Structure

Every ServiceNow component follows this structure:

```
component-name/
├── index.js           # Component logic and registration
├── styles.scss        # Component styles
├── README.md          # Component documentation
└── __tests__/         # Unit tests
    └── component-name.test.js
```

### Component Registration

Components are registered using `createCustomElement`:

```javascript
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

createCustomElement('component-name', {
  renderer: {type: snabbdom},
  view,
  styles,
  properties: {},
  initialState: {},
  actionHandlers: {}
});
```

---

## Main Concepts

### 1. View Function

The view function is the heart of your component. It defines what gets rendered.

**Key Points:**
- Pure function that returns JSX
- Receives `state` and helper functions (`updateState`, `dispatch`)
- Re-runs whenever state or properties change
- Should not have side effects

**Example:**

```javascript
const view = (state, {updateState, dispatch}) => {
  const handleClick = () => {
    updateState({count: state.count + 1});
  };

  return (
    <div>
      <h1>{state.title}</h1>
      <button on-click={handleClick}>
        Clicked {state.count} times
      </button>
    </div>
  );
};
```

**Event Handlers:**
- Use `on-click`, `on-input`, `on-change`, etc.
- Define handlers as arrow functions
- Call `updateState` to modify state
- Use `dispatch` to emit custom events

---

### 2. Properties

Properties are **external** configuration options that can be set by component users.

**Characteristics:**
- Defined in the `properties` object
- Can have default values and types
- Accessible via `state.properties.propertyName` in the view
- Can be set via HTML attributes or JavaScript

**Example:**

```javascript
properties: {
  title: {
    default: 'Default Title',
    type: String
  },
  count: {
    default: 0,
    type: Number
  },
  isEnabled: {
    default: true,
    type: Boolean
  },
  items: {
    default: [],
    type: Array
  }
}
```

**Usage:**

```html
<!-- HTML -->
<my-component title="Custom Title" count="5" is-enabled="true"></my-component>
```

```javascript
// JavaScript
const component = document.createElement('my-component');
component.title = 'Custom Title';
component.count = 5;
component.isEnabled = true;
```

---

### 3. State Management

State is **internal** component data that can change over time.

**Characteristics:**
- Defined in `initialState`
- Modified using `updateState`
- Immutable - always create new state objects
- Triggers re-render when changed

**Example:**

```javascript
initialState: {
  clickCount: 0,
  inputValue: '',
  isLoading: false,
  data: []
}

// In view function
const handleClick = () => {
  updateState({
    clickCount: state.clickCount + 1,
    isLoading: true
  });
};
```

**Important:**
- Use `updateState` to modify state, never mutate directly
- `updateState` merges the new state with existing state
- State updates are asynchronous

---

### 4. Action Handlers

Action handlers respond to lifecycle events and custom actions.

**Lifecycle Events:**

```javascript
import {actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED, COMPONENT_CONNECTED, COMPONENT_DISCONNECTED} = actionTypes;

actionHandlers: {
  // Called once when component is initialized
  [COMPONENT_BOOTSTRAPPED]: ({state, updateState, dispatch}) => {
    console.log('Component initialized');
    // Perform initialization logic
  },
  
  // Called when component is added to DOM
  [COMPONENT_CONNECTED]: ({state}) => {
    console.log('Component connected to DOM');
  },
  
  // Called when component is removed from DOM
  [COMPONENT_DISCONNECTED]: ({state}) => {
    console.log('Component disconnected from DOM');
    // Cleanup logic (e.g., remove event listeners)
  }
}
```

**Custom Action Handlers:**

```javascript
actionHandlers: {
  'CUSTOM_ACTION': ({action, state, updateState}) => {
    console.log('Custom action received:', action.payload);
    // Handle the action
  }
}
```

---

### 5. Event Dispatching

Components can dispatch custom events to communicate with parent components or the application.

**Example:**

```javascript
const view = (state, {dispatch}) => {
  const handleSubmit = () => {
    dispatch('DATA_SUBMITTED', {
      value: state.inputValue,
      timestamp: Date.now()
    });
  };

  return (
    <button on-click={handleSubmit}>Submit</button>
  );
};

// Handle the event
actionHandlers: {
  'DATA_SUBMITTED': ({action, state}) => {
    console.log('Data submitted:', action.payload);
    // Perform side effects (API calls, etc.)
  }
}
```

---

## Implementation Details

### Seismic Data Display Component

The `seismic-data-display` component demonstrates all these concepts:

#### 1. Properties (External Configuration)

```javascript
properties: {
  title: {default: 'Seismic Data Display Component', type: String},
  description: {default: '...', type: String},
  isActive: {default: true, type: Boolean},
  showAdvanced: {default: false, type: Boolean}
}
```

#### 2. State (Internal Data)

```javascript
initialState: {
  clickCount: 0,
  inputValue: '',
  lastClickTime: null,
  componentId: `seismic-${Math.random().toString(36).substr(2, 9)}`
}
```

#### 3. View Function (UI Rendering)

```javascript
const view = (state, {updateState, dispatch}) => {
  const handleButtonClick = () => {
    updateState({
      clickCount: state.clickCount + 1,
      lastClickTime: new Date().toLocaleTimeString()
    });
    
    dispatch('SEISMIC_DATA_UPDATED', {
      count: state.clickCount + 1,
      timestamp: Date.now()
    });
  };

  return (
    <div className="seismic-component-wrapper">
      <h1>{state.title}</h1>
      <button on-click={handleButtonClick}>Record Data Point</button>
      <span>Count: {state.clickCount}</span>
    </div>
  );
};
```

#### 4. Action Handlers (Lifecycle & Events)

```javascript
actionHandlers: {
  [COMPONENT_BOOTSTRAPPED]: ({state, updateState}) => {
    console.log('Component initialized');
    updateState({
      lastClickTime: 'Component initialized at ' + new Date().toLocaleTimeString()
    });
  },
  
  'SEISMIC_DATA_UPDATED': ({action, state}) => {
    console.log('Data updated:', action.payload);
  }
}
```

---

## Best Practices

### 1. Component Design

✅ **DO:**
- Keep components focused and single-purpose
- Use descriptive property and state names
- Provide sensible default values
- Document your component with README

❌ **DON'T:**
- Create overly complex components
- Mix business logic with presentation
- Mutate state directly
- Forget to handle edge cases

### 2. State Management

✅ **DO:**
- Use properties for external configuration
- Use state for internal component data
- Keep state minimal and derived values in view
- Update state immutably

❌ **DON'T:**
- Store derived values in state
- Mutate state objects directly
- Use state for values that don't affect rendering
- Create unnecessary state variables

### 3. Event Handling

✅ **DO:**
- Use descriptive event names (UPPERCASE_WITH_UNDERSCORES)
- Include relevant data in event payloads
- Handle events in action handlers
- Clean up event listeners in COMPONENT_DISCONNECTED

❌ **DON'T:**
- Create too many custom events
- Put heavy logic in event handlers
- Forget to handle errors
- Create circular event dependencies

### 4. Styling

✅ **DO:**
- Use SCSS for styling
- Follow BEM or similar naming convention
- Make components responsive
- Use CSS variables for theming

❌ **DON'T:**
- Use inline styles
- Create overly specific selectors
- Forget about accessibility
- Ignore mobile devices

### 5. Testing

✅ **DO:**
- Write unit tests for components
- Test different property combinations
- Test state changes
- Test event dispatching

❌ **DON'T:**
- Skip testing edge cases
- Test implementation details
- Forget to test accessibility
- Write brittle tests

---

## Common Patterns

### 1. Conditional Rendering

```javascript
const view = (state) => (
  <div>
    {state.isLoading && <div>Loading...</div>}
    {!state.isLoading && state.data && (
      <div>Data: {state.data}</div>
    )}
    {state.error && <div className="error">{state.error}</div>}
  </div>
);
```

### 2. List Rendering

```javascript
const view = (state) => (
  <ul>
    {state.items.map((item, index) => (
      <li key={index}>{item.name}</li>
    ))}
  </ul>
);
```

### 3. Form Handling

```javascript
const view = (state, {updateState}) => {
  const handleInputChange = (e) => {
    updateState({inputValue: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form
  };

  return (
    <form on-submit={handleSubmit}>
      <input
        type="text"
        value={state.inputValue}
        on-input={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 4. Async Operations

```javascript
actionHandlers: {
  [COMPONENT_BOOTSTRAPPED]: async ({updateState, dispatch}) => {
    updateState({isLoading: true});
    
    try {
      const data = await fetchData();
      updateState({data, isLoading: false});
      dispatch('DATA_LOADED', {data});
    } catch (error) {
      updateState({error: error.message, isLoading: false});
      dispatch('DATA_ERROR', {error});
    }
  }
}
```

### 5. Debouncing Input

```javascript
let debounceTimer;

const view = (state, {updateState, dispatch}) => {
  const handleInput = (e) => {
    const value = e.target.value;
    updateState({inputValue: value});
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      dispatch('INPUT_DEBOUNCED', {value});
    }, 300);
  };

  return <input on-input={handleInput} value={state.inputValue} />;
};
```

---

## Summary

The ServiceNow Next Experience UI Framework provides a powerful, declarative way to build components:

1. **View Function**: Declarative UI rendering
2. **Properties**: External configuration
3. **State**: Internal component data
4. **Action Handlers**: Lifecycle and event handling
5. **Event Dispatching**: Component communication

By following these patterns and best practices, you can create robust, maintainable, and reusable components for ServiceNow applications.

---

## Additional Resources

- [ServiceNow UI Framework Documentation](https://developer.servicenow.com/dev.do#!/reference/next-experience/zurich/ui-framework/main-concepts/component)
- [Component Examples](./example/seismic-data-display-example.html)
- [Component Source Code](./src/seismic-data-display/index.js)
- [ServiceNow Developer Portal](https://developer.servicenow.com/)
