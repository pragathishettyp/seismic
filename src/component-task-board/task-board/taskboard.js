import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from './taskboard.scss';
import actions from './actions';
import {LANES} from '../constants';

createCustomElement('task-board', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		lanes: LANES
	},
	...actions
})
