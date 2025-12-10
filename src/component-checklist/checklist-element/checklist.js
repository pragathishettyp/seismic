import {createCustomElement} from '@servicenow/ui-core';
import view from './view';
import styles from './checklist.scss';
import actions from './actions';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

createCustomElement('checklist-element', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		items: [],
		inputValue: ''
	},
	styles,
	...actions
});
