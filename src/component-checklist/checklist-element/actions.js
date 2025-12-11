// import {ADD_ITEM} from './constants';
import {
	ADD_ITEM,
	CHECKLIST_ITEM_ADD,
	CREATE_ITEM_REQUESTED,
	TOGGLE_CLICKED,
	DELETE_CLICKED,
	SHOW_ALL_ITEMS,
	SHOW_INCOMPLETE_ITEMS,
	SHOW_COMPLETE_ITEMS
} from '../constants';

export default {
	actionHandlers: {
		COMPONENT_BOOTSTRAPPED: ({updateState}) => {
			console.log('🔄 Component loading...');
			const savedItems = localStorage.getItem('checklistItems');
			console.log('Saved items from localStorage:', savedItems);

			if (savedItems) {
				try {
					const items = JSON.parse(savedItems);
					console.log('Parsed items:', items);
					updateState({items});
				} catch (error) {
					console.error('Error parsing saved items:', error);
				}
			}
		},

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

		[SHOW_ALL_ITEMS]: ({updateState}) => {
			updateState({filter: 'all'});
		},

		[SHOW_INCOMPLETE_ITEMS]: ({updateState}) => {
			updateState({filter: 'incomplete'});
		},

		[SHOW_COMPLETE_ITEMS]: ({updateState}) => {
			updateState({filter: 'complete'});
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

			// Save to localStorage
			localStorage.setItem('checklistItems', JSON.stringify(items));

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

		[TOGGLE_CLICKED]: ({action, updateState, state}) => {
			const {payload: {index}} = action;
			const items = [...(state.items || [])];
			console.log('Items array BEFORE toggle:', JSON.stringify(items));
			console.log('Item being toggled:', JSON.stringify(items[action.payload.index]));
			// items[index].completed = !items[index].completed;
			items[action.payload.index].completed = !items[action.payload.index].completed;
			console.log('Item AFTER toggle:', JSON.stringify(items[action.payload.index]));
			console.log('All items AFTER toggle:', JSON.stringify(items));

			localStorage.setItem('checklistItems', JSON.stringify(items));
			console.log('Calling updateState with items:', JSON.stringify(items));

			updateState({items});
			console.log('=== TOGGLE_CLICKED END ===');
		},
		// [DELETE_CLICKED]: ({action, updateState}) => {
		// 	const {payload: {index}} = action;
		// 	const items = [...(updateState.items || [])];
		// 	items.splice(index, 1);
		// 	updateState({items});
		// }


	}
};
