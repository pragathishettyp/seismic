# Seismic Component - ServiceNow UI Framework Components

A collection of ServiceNow Next Experience UI Framework components demonstrating best practices and main concepts from the [official documentation](https://developer.servicenow.com/dev.do#!/reference/next-experience/zurich/ui-framework/main-concepts/component).

## 📦 Components

### 1. Seismic Data Display (`seismic-data-display`)

A comprehensive component showcasing all major ServiceNow UI Framework concepts:

- ✅ **Properties**: Externally configurable component attributes
- ✅ **State Management**: Internal state with `updateState`
- ✅ **Event Handling**: User interactions and custom events
- ✅ **Action Handlers**: Lifecycle events and custom actions
- ✅ **View Function**: Declarative UI with JSX
- ✅ **Styling**: Modern SCSS with responsive design
- ✅ **Testing**: Unit tests with Jest

**Features:**
- Interactive data input and recording
- Real-time statistics display
- Modern, responsive UI with animations
- Event dispatching and handling
- Configurable properties

[View Component Documentation](./src/seismic-data-display/README.md)

### 2. Example Hello World (`example-hello-world`)

A basic starter component demonstrating the minimal setup required.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- ServiceNow instance (for deployment)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Build the components
npm run build

# Run tests
npm test

# Watch mode for development
npm run watch
```

### Using the Components

#### In ServiceNow UI Builder

1. Deploy this component package to your ServiceNow instance
2. Open UI Builder
3. Add the component to your page:

```xml
<seismic-data-display
  title="My Seismic Monitor"
  description="Track seismic activity data"
  is-active="true"
  show-advanced="false">
</seismic-data-display>
```

#### Programmatically

```javascript
const component = document.createElement('seismic-data-display');
component.title = 'Custom Title';
component.isActive = true;
document.body.appendChild(component);
```

## 📁 Project Structure

```
seismic-component/
├── src/
│   ├── seismic-data-display/      # Main component
│   │   ├── index.js               # Component logic
│   │   ├── styles.scss            # Component styles
│   │   ├── README.md              # Component docs
│   │   └── __tests__/             # Unit tests
│   ├── example-hello-world/       # Example component
│   └── index.js                   # Main entry point
├── example/
│   └── seismic-data-display-example.html  # Usage examples
├── now-ui.json                    # Component configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🎯 Key Concepts Demonstrated

### 1. Component Registration

```javascript
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

createCustomElement('seismic-data-display', {
  renderer: {type: snabbdom},
  view,
  styles,
  properties: { /* ... */ },
  initialState: { /* ... */ },
  actionHandlers: { /* ... */ }
});
```

### 2. Properties (External Configuration)

```javascript
properties: {
  title: {
    default: 'Default Title',
    type: String
  },
  isActive: {
    default: true,
    type: Boolean
  }
}
```

### 3. State Management

```javascript
initialState: {
  clickCount: 0,
  inputValue: ''
}

// Update state
updateState({clickCount: state.clickCount + 1});
```

### 4. Event Handling

```javascript
// Dispatch custom events
dispatch('SEISMIC_DATA_UPDATED', {
  count: state.clickCount,
  timestamp: Date.now()
});

// Handle events
actionHandlers: {
  'SEISMIC_DATA_UPDATED': ({action, state}) => {
    console.log('Event received:', action.payload);
  }
}
```

### 5. Lifecycle Management

```javascript
actionHandlers: {
  [COMPONENT_BOOTSTRAPPED]: ({state, updateState}) => {
    console.log('Component initialized');
  }
}
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 📚 Resources

- [ServiceNow UI Framework Documentation](https://developer.servicenow.com/dev.do#!/reference/next-experience/zurich/ui-framework/main-concepts/component)
- [ServiceNow Developer Portal](https://developer.servicenow.com/)
- [Next Experience UI Framework Getting Started](https://developer.servicenow.com/dev.do#!/reference/next-experience/latest/ui-framework/getting-started/introduction)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is part of the Tectonic seismic component library.

## 👥 Authors

Component Authors - ServiceNow UI Framework Components

---

**Note**: This component is built for ServiceNow Next Experience UI Framework and requires a ServiceNow instance for deployment and full functionality.