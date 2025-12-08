import {createCustomElement, createContext} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

// Create a theme context
const themeContext = createContext('theme-context', {
  default: {'--now-color--primary': '79,82,189'},
  schema: {
    properties: {
      '--now-color--primary': {
        type: 'string'
      }
    },
    required: ['--now-color--primary']
  }
});

// Create a component that uses the context
createCustomElement('component-context', {
  renderer: {type: snabbdom},
  
  // Provide the context to child components
  contextProviders: [
    {
      context: themeContext,
      value: {'--now-color--primary': '79,82,189'}
    }
  ],
  
  view(state, {updateState}) {
    return (
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2>Component Context Demo</h2>
        <p>This component demonstrates context usage in ServiceNow UI Framework.</p>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h3>Theme Context</h3>
          <p>Primary Color: <code>rgb(79, 82, 189)</code></p>
          <div 
            style="width: 100px; height: 100px; background: rgb(79, 82, 189); border-radius: 5px; margin-top: 10px;"
          ></div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 5px;">
          <h4>What is Context?</h4>
          <ul style="line-height: 1.8;">
            <li>Context allows sharing data between components without passing props</li>
            <li>Useful for themes, user preferences, and global state</li>
            <li>Created with <code>createContext()</code></li>
            <li>Provided via <code>contextProviders</code> array</li>
          </ul>
        </div>
      </div>
    );
  }
});