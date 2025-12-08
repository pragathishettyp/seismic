import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, { updateState }) => {
    return (
        <div className="my-component-container">
            <h1>{state.title}</h1>
            <p>{state.message}</p>
            <button on-click={() => updateState({ clickCount: state.clickCount + 1 })}>
                Click me!
            </button>
            <p>Button clicked {state.clickCount} times</p>
        </div>
    );
};

createCustomElement('x-my-component', {
    renderer: { type: snabbdom },
    view,
    styles,
    properties: {
        title: {
            default: 'Welcome to My Component'
        },
        message: {
            default: 'This is a ServiceNow Next Experience component'
        }
    },
    initialState: {
        clickCount: 0
    },
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: ({ updateState }) => {
            console.log('Component has been bootstrapped');
        }
    }
});
