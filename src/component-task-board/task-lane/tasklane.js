import { createCustomElement } from "@servicenow/ui-core";
import	view from './view';
import	styles from './tasklane.scss';
import actions from './actions';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {LANES} from '../constants';


createCustomElement('task-lane', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		laneId: 0,
		title: 'ToDo'
	}
})
