import {createCustomElement} from '@servicenow/ui-core';
import view from './view';
import styles from './checklist-item.scss';
import actions from './actions';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

createCustomElement('checklist-item', {
	renderer: {type: snabbdom},
	view,
	styles,
	actions,
	properties: {
		itemId: String,

	}

});
