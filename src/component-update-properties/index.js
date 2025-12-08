import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

const view = ({properties: {name}}, {updateProperties}) => (
    <button on-click={e => updateProperties({name: 'Prax'})}>Hello {name}!</button>
);

createCustomElement('component-update-properties', {
    renderer: {type: snabbdom},
    view,
    properties: {
        name: {default: 'Fred'}
    }
});