# 📚 How to Add Actions to Seismic Components (Tectonic Framework)

This guide explains how to add actions to your Seismic components using the Tectonic framework.

---

## 🎯 What are Actions?

Actions are events that occur in your component. They follow a **unidirectional data flow** pattern:

```
User Interaction → dispatch(ACTION) → Action Handler → State Update → View Re-render
```

---

## 📋 Step-by-Step Guide

### **Step 1: Define Action Constants** (Optional but Recommended)

Create a `constants.js` or `actions.js` file to define your action types:

```javascript
// src/my-component/constants.js

/**
 * Action types for my-component
 */
export const ITEM_ADDED = 'ITEM_ADDED';
export const ITEM_DELETED = 'ITEM_DELETED';
export const FILTER_APPLIED = 'FILTER_APPLIED';
```

**Benefits:**
- Prevents typos
- Makes refactoring easier
- Provides autocomplete in IDEs
- Self-documenting code

---

### **Step 2: Create Action Handlers**

Action handlers are functions that respond to dispatched actions. They receive a `coeffects` object containing:

- `action` - The dispatched action with payload
- `state` - Current component state
- `updateState` - Function to update state
- `dispatch` - Function to dispatch other actions
- `properties` - Component properties

```javascript
// Basic action handler
const handleItemAdded = ({action, updateState, state}) => {
    console.log('ITEM_ADDED', action.payload);
    
    const newItem = {
        id: Date.now(),
        text: action.payload.text,
        completed: false
    };
    
    updateState({
        items: [...state.items, newItem]
    });
};

// Action handler that dispatches another action
const handleItemDeleted = ({action, updateState, state, dispatch}) => {
    console.log('ITEM_DELETED', action.payload);
    
    updateState({
        items: state.items.filter(item => item.id !== action.payload.id)
    });
    
    // Optionally dispatch another action
    dispatch('ITEM_COUNT_CHANGED', {count: state.items.length - 1});
};
```

---

### **Step 3: Register Action Handlers in Component**

In your component definition, add the `actionHandlers` property:

```javascript
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {ITEM_ADDED, ITEM_DELETED} from './constants';

createCustomElement('my-component', {
    renderer: {type: snabbdom},
    
    // Initial state
    initialState: {
        items: [],
        filter: 'all'
    },
    
    // View function
    view(state, {dispatch}) {
        return (
            <div>
                <button on-click={() => dispatch(ITEM_ADDED, {text: 'New Item'})}>
                    Add Item
                </button>
                {/* ... rest of view */}
            </div>
        );
    },
    
    // Action handlers
    actionHandlers: {
        [ITEM_ADDED]: handleItemAdded,
        [ITEM_DELETED]: handleItemDeleted,
        
        // Inline handler (for simple actions)
        'FILTER_APPLIED': ({action, updateState}) => {
            updateState({filter: action.payload.filter});
        }
    }
});
```

---

### **Step 4: Dispatch Actions from View**

Use the `dispatch` function provided in the view's second parameter:

```javascript
view(state, {dispatch}) {
    return (
        <div>
            {/* Button click */}
            <button on-click={() => dispatch('ITEM_ADDED', {text: 'New Item'})}>
                Add
            </button>
            
            {/* Input with Enter key */}
            <input 
                on-keypress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch('ITEM_ADDED', {text: e.target.value});
                    }
                }}
            />
            
            {/* Checkbox change */}
            <input 
                type="checkbox"
                on-change={() => dispatch('ITEM_TOGGLED', {id: item.id})}
            />
            
            {/* Delete button */}
            <button on-click={() => dispatch('ITEM_DELETED', {id: item.id})}>
                Delete
            </button>
        </div>
    );
}
```

---

## 🔥 Common Action Patterns

### **1. Simple State Update**
```javascript
'INPUT_CHANGED': ({action, updateState}) => {
    updateState({inputValue: action.payload.value});
}
```

### **2. Array Manipulation**
```javascript
// Add to array
'ITEM_ADDED': ({action, updateState, state}) => {
    updateState({
        items: [...state.items, action.payload.item]
    });
}

// Remove from array
'ITEM_DELETED': ({action, updateState, state}) => {
    updateState({
        items: state.items.filter(item => item.id !== action.payload.id)
    });
}

// Update item in array
'ITEM_UPDATED': ({action, updateState, state}) => {
    updateState({
        items: state.items.map(item =>
            item.id === action.payload.id
                ? {...item, ...action.payload.updates}
                : item
        )
    });
}
```

### **3. Toggle Boolean**
```javascript
'ITEM_TOGGLED': ({action, updateState, state}) => {
    updateState({
        items: state.items.map(item =>
            item.id === action.payload.id
                ? {...item, completed: !item.completed}
                : item
        )
    });
}
```

### **4. Chaining Actions**
```javascript
'SAVE_CLICKED': ({dispatch, state}) => {
    // Dispatch multiple actions in sequence
    dispatch('VALIDATION_STARTED');
    
    if (isValid(state)) {
        dispatch('SAVE_STARTED');
        // Trigger effect to save data
        dispatch('SAVE_DATA', {data: state.formData});
    } else {
        dispatch('VALIDATION_FAILED', {errors: getErrors(state)});
    }
}
```

### **5. Conditional Actions**
```javascript
'ACTION_CLICKED': ({action, updateState, dispatch}) => {
    console.log('ACTION_CLICKED', action.payload);
    
    if (action.payload.id === 'SHOW_ALL') {
        updateState({filter: 'all'});
        dispatch('FILTER_CHANGED', {filter: 'all'});
    } else if (action.payload.id === 'CLEAR_ALL') {
        updateState({items: []});
        dispatch('ITEMS_CLEARED');
    }
}
```

---

## 🎨 Action Naming Conventions

### **Standard Patterns:**

1. **Past Tense** (recommended for user actions):
   - `BUTTON_CLICKED`
   - `ITEM_ADDED`
   - `FORM_SUBMITTED`

2. **Namespaced** (for complex components):
   - `CHECK_LIST_ITEM#ADDED`
   - `CHECK_LIST_ITEM#DELETED`
   - `USER_PROFILE#UPDATED`

3. **Lifecycle Actions** (built-in):
   - `COMPONENT_CONNECTED`
   - `COMPONENT_DISCONNECTED`
   - `COMPONENT_PROPERTY_CHANGED`

---

## 🔍 Debugging Actions

### **1. Console Logging**
```javascript
const handleItemAdded = ({action}) => {
    console.log('Action Type:', action.type);
    console.log('Payload:', action.payload);
    console.log('Full Action:', action);
};
```

### **2. Action Logger Middleware**
```javascript
// Log all actions
actionHandlers: {
    '*': ({action}) => {
        console.log(`[ACTION] ${action.type}`, action.payload);
    },
    'ITEM_ADDED': handleItemAdded,
    // ... other handlers
}
```

---

## ✅ Best Practices

1. **Keep action handlers pure** - No side effects except state updates
2. **Use constants** - Define action types as constants
3. **Descriptive names** - Use clear, descriptive action names
4. **Small payloads** - Only include necessary data in payload
5. **Log actions** - Add console.log for debugging during development
6. **Handle errors** - Add try-catch blocks for async operations
7. **Document actions** - Comment what each action does

---

## 📦 Complete Example

Here's a complete working example:

```javascript
// constants.js
export const ITEM_ADDED = 'ITEM_ADDED';
export const ITEM_DELETED = 'ITEM_DELETED';
export const ITEM_TOGGLED = 'ITEM_TOGGLED';

// index.js
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {ITEM_ADDED, ITEM_DELETED, ITEM_TOGGLED} from './constants';

// Action Handlers
const handleItemAdded = ({action, updateState, state}) => {
    console.log('ITEM_ADDED', action.payload);
    const newItem = {
        id: Date.now(),
        text: action.payload.text,
        completed: false
    };
    updateState({
        items: [...state.items, newItem]
    });
};

const handleItemDeleted = ({action, updateState, state}) => {
    console.log('ITEM_DELETED', action.payload);
    updateState({
        items: state.items.filter(item => item.id !== action.payload.id)
    });
};

const handleItemToggled = ({action, updateState, state}) => {
    console.log('ITEM_TOGGLED', action.payload);
    updateState({
        items: state.items.map(item =>
            item.id === action.payload.id
                ? {...item, completed: !item.completed}
                : item
        )
    });
};

// Component
createCustomElement('todo-list', {
    renderer: {type: snabbdom},
    
    initialState: {
        items: [],
        inputValue: ''
    },
    
    view(state, {dispatch}) {
        const {items, inputValue} = state;
        
        return (
            <div>
                <input
                    value={inputValue}
                    on-input={(e) => dispatch('INPUT_CHANGED', {value: e.target.value})}
                    on-keypress={(e) => {
                        if (e.key === 'Enter' && inputValue.trim()) {
                            dispatch(ITEM_ADDED, {text: inputValue});
                        }
                    }}
                />
                
                {items.map(item => (
                    <div key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            on-change={() => dispatch(ITEM_TOGGLED, {id: item.id})}
                        />
                        <span>{item.text}</span>
                        <button on-click={() => dispatch(ITEM_DELETED, {id: item.id})}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        );
    },
    
    actionHandlers: {
        [ITEM_ADDED]: handleItemAdded,
        [ITEM_DELETED]: handleItemDeleted,
        [ITEM_TOGGLED]: handleItemToggled,
        'INPUT_CHANGED': ({action, updateState}) => {
            updateState({inputValue: action.payload.value});
        }
    }
});
```

---

## 🚀 Next Steps

1. **Effects** - Learn about side effects (HTTP requests, localStorage, etc.)
2. **Properties** - Learn about component properties and `COMPONENT_PROPERTY_CHANGED`
3. **Lifecycle** - Learn about component lifecycle actions
4. **Testing** - Learn how to test action handlers

---

## 📚 Resources

- [Tectonic Documentation](https://developer.servicenow.com/dev.do#!/reference/next-experience/latest/ui-framework)
- [UI Framework Actions](https://developer.servicenow.com/dev.do#!/reference/next-experience/latest/ui-framework/main-concepts/actions)
- [Action Handlers](https://developer.servicenow.com/dev.do#!/reference/next-experience/latest/ui-framework/main-concepts/action-handlers)

---

**Happy Coding! 🎉**
