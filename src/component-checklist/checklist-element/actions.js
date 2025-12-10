// import {ADD_ITEM} from './constants';
import {
	ADD_ITEM,
	CHECKLIST_ITEM_ADD,
	CREATE_ITEM_REQUESTED,
	TOGGLE_CLICKED,
	DELETE_CLICKED
} from '../constants';

export default {
	actionHandlers: {
		[DELETE_CLICKED] : ({state, updateState, action}) => {
			console.log('🔴 DELETE_CLICKED fired');
			console.log('Index to delete:', action.payload.index);
			console.log('Full state:', state);
			console.log('Items before:', state.items);

			// const items = [...state.items];
			const items = [...(state.items || [])];
			items.splice(action.payload.index, 1);
			updateState({items});
		},

		[CHECKLIST_ITEM_ADD]: ({action, updateState, dispatch, state}) => {
			const {
				payload: {inputValue}
			} = action;
			const {userSysId} = state;
			updateState({inputValue: ''});
			dispatch(CREATE_ITEM_REQUESTED, {
				data: {
					short_description: inputValue,
					assigned_to: userSysId,
					active: false
				}
			});
		},

		// [ADD_ITEM]: ({state, updateState, action}) => {
		// 	const newItem = {
		// 		id: Date.now(),
		// 		task: action.payload.task,
		// 		completed: false
		// 	};

		// 	const items = [...(state.items || []), newItem];

		// 	updateState({
		// 		items: items,
		// 		inputValue: ''
		// 	});
		// },

		ADD_ITEM: ({state, updateState, action}) => {
			console.log('➕ Adding item:', action.payload.task);

			const newItem = {
				id: Date.now(),
				task: action.payload.task,
				completed: false
			};

			const items = [...(state.items || []), newItem];

			console.log('Items after add:', items);

			updateState({
				items: items,
				inputValue: ''  // Clear input box
			});
		},


		// UPDATE_TASK: ({state, updateState, action}) => {
		// 	const items = [...state.items];
		// 	items[action.payload.index].task = action.payload.task;
		// 	updateState({items});
		// },

		[TOGGLE_CLICKED]: ({action, updateState}) => {
			const {payload: {index}} = action;
			const items = [...(updateState.items || [])];
			items[index].completed = !items[index].completed;
			updateState({items});
		},
		// [DELETE_CLICKED]: ({action, updateState}) => {
		// 	const {payload: {index}} = action;
		// 	const items = [...(updateState.items || [])];
		// 	items.splice(index, 1);
		// 	updateState({items});
		// }


	}
};
