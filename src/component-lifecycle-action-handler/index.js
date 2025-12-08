import {createCustomElement, actionTypes, errorLocations} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

const {COMPONENT_ERROR_THROWN} = actionTypes;
const view = (state, {dispatch, updateProperties, updateState}) => {
    return (
        <div>
            <h2>Lifecycle Action Handler Example</h2>
            <p>This component demonstrates error handling with COMPONENT_ERROR_THROWN action.</p>
            <div 
                style="padding: 20px; border: 2px solid #e74c3c; background: #ffe6e6; cursor: pointer; margin: 10px 0;"
            >
                <strong>Click this box to trigger an error!</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px;">The error will be caught and logged to the console.</p>
            </div>
            <p style="font-size: 12px; color: #666;">
                💡 Open the browser console (F12) to see the error being handled.
            </p>
        </div>
    );
};

createCustomElement('component-lifecycle-action-handler', {
    renderer: {type: snabbdom},
    view,
    actionHandlers: {
        [COMPONENT_ERROR_THROWN]: ({action}) => {
            const {
                payload: {location, error, details}
            } = action;
            if (location === errorLocations.EVENT) {
                // Do something here
                console.log('Error in event handler: ', {error, details});
            }
        }
    },
    eventHandlers: [
        {
            events: ['click'],
            effect(coeffects) {
                throw new Error('Error in event handler');
            }
        }
    ]
});
