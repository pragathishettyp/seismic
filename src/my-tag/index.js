import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
const {COMPONENT_PROPERTY_CHANGED} = actionTypes;

createCustomElement('my-tag', {
    view(state, {updateProperties}) {
        const {tally} = state;
        return (
            <div>
                <h2>Click Counter</h2>
                <span>
                    <button type="button" on-click={() => updateProperties({tally: tally + 1})}>
                        Increment
                    </button>
                </span>
                <span>
                    <button type="button" on-click={() => updateProperties({tally: 0})}>
                        Clear
                    </button>
                </span>
                <div>Value: {tally}</div>
            </div>
        );
    },
    transformState(state) {
        const {properties} = state;
        return properties;
    },
    renderer: {type: snabbdom},
    properties: {
        tally: {default: 0}
    },
    actionHandlers: {
        [COMPONENT_PROPERTY_CHANGED]({dispatch, properties: {tally}}) {
            dispatch('TALLY_CHANGED', {tally});
        }
    }
});
