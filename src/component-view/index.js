import {createCustomElement, declarativeOperations} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

createCustomElement('component-view', {
    renderer: {type: snabbdom},
    view(derivedState, {dispatch, updateState, updateProperties}) {
        return (
            <div>
                <a
                    href="https://google.com"
                    on-click={e => {
                        updateState({
                            operation: declarativeOperations.SET,
                            path: 'some.long.path',
                            value: 'I was clicked.'
                        });
                    }}
                >
                    Update State
                </a>
                <a
                    href="https://developer.servicenow.com/dev.do#!/reference/next-experience/xanadu/ui-framework/main-concepts/view"
                    on-click={e => {
                        updateProperties({clicked: true});
                    }}
                >
                    Update Properties
                </a>
            </div>
        );
    }
});