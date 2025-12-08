import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

async function httpEffect(url, options, coeffects) {
    const {action, dispatch} = coeffects;

    dispatch('FETCH_STARTED');
    try {
        const result = await fetch(url, options);
        dispatch('FETCH_SUCCEEDED', result);
    } catch (e) {
        dispatch('FETCH_FAILED', e, {} /* meta */, true /* error */);
    }
}

// Create Effect Handler
// Function that takes in some arguments and creates an effect handler
// This is generic and can be reused anywhere http requests are needed
function createHttpEffect(url, options) {
    return {
        effect: httpEffect,
        args: [url, options]
    };
}

// Create the effect handler for fetching a user
const fetchUserEffect = createHttpEffect('/api/users/1', {
    /* options */
});

// Handle when user fetch succeeded: log the result
const handleFetchUserSucceeded = ({action}) => console.log(action.payload);

// Handle when user fetch failed: alert failure message
const handleFetchUserFailed = ({action}) => alert('User fetch failed!');

// View function to render the component
const view = (state, {dispatch}) => (
    <div>
        <h2>Action Handler Example</h2>
        <p>Click the button below to trigger a fetch action:</p>
        <button on-click={() => dispatch('USER_FETCHED')}>Fetch User</button>
        <p style="margin-top: 10px; font-size: 12px; color: #666;">
            Check the console to see the fetch result when successful.
        </p>
    </div>
);

// Component
createCustomElement('component-action-handler', {
    renderer: {type: snabbdom},
    view,
    actionHandlers: {
        // This would be dispatched within the component's view or COMPONENT_CONNECTED action handler
        USER_FETCHED: fetchUserEffect,
        // This is dispatched from the effect on success, handle it here
        FETCH_SUCCEEDED: handleFetchUserSucceeded,
        // This is dispatched if the fetch failed, handle it here
        FETCH_FAILED: handleFetchUserFailed
    }
});
