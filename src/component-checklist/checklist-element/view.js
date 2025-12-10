import '@servicenow/now-heading';
import '@servicenow/now-button';
import '@servicenow/now-input';
import checklistItem from '../checklist-item/view';
import {CHECKLIST_ITEM_ADD,ENTER_KEY_CODE} from '../constants';
import {TOGGLE_CLICKED, DELETE_CLICKED} from '../constants';
// import '@servicenow/now-input-wrapper';
// import '@servicenow/now-container';

// export default(state, {dispatch, updateProperties}) => {
// 	return (
// 			<header>
// 				<now-heading
// 					label="Checklist"
// 					level="1"
// 					size="xl"
// 				/>
// 			</header>
// 	);
// };

export default(state, {updateState, dispatch}) => {
	const {inputValue} = state;
	// const items = state.items || [];
	const items = [
		{task: 'Test 1', completed: false},
		{task: 'Test 2', completed: false}
	];
	return (

		<main className="checklist-container">

			<div className="checklist-header">
				<h1>Checklist</h1>
			</div>


			<div className="checklist-input-wrapper">
				<now-input
					size="md"
					label="Add Items"
					placeholder="What needs to be done?"

					on-change={(e) => dispatch({inputValue: e.target.value})}
					on-keypress={(e) => {
						if(e.key === 'Enter' && inputValue && inputValue.trim()){
							dispatch(CHECKLIST_ITEM_ADD, {inputValue: inputValue.trim()})
						}
					}}


					// onChange={(e) => dispatch({type: 'UPDATE_INPUT_VALUE', payload: e.target.value})}
					// onKeyPress={(e) => {
					// 	if (e.key === 'Enter' && state.inputValue && state.inputValue.trim()) {
					// 		dispatch('ADD_ITEM', {task: state.inputValue.trim()});
					// 	}
					// }}
				/>
			</div>

			<now-header>
				<now-heading
					className="checklist-header"
					label='Checklist'
					size="md"
				/>
			</now-header>

			<now-input
				className="now-checklist-input"
				size="md"
				label="Add Items"
				placeholder="What needs to be done?"
				autoFocus

				value={inputValue}
				on-input={(e) => updateState({inputValue: e.target.value})}
				on-keypress={(e) => {
					const inputValue = e.target.value.trim();
					if (e.key === 'Enter' && inputValue) {
						dispatch('ADD_ITEM', {task: inputValue});
					}
				}}
			/>

			<div class="now-table-container" >
				<table className="now-table">
					<thead>
						<tr>
							<th>Mark as done</th>
							<th>Task</th>
						</tr>
					</thead>
					<tbody className="now-table-body">
						{items.map((item, index) => (checklistItem(item, index, dispatch)))}
					</tbody>
			    </table>
			</div>

			<now-footer>
				<div className="checklist-footer">
					<p>2 items left(4 visible)	</p>
					<now-button
						variant="primary"
						size="sm"
						label="Show All"
					/>
					<now-button
						variant="primary"
						size="sm"
						label="Show Incomplete"
					/>
					<now-button
						variant="primary"
						size="sm"
						label="Show Complete"
					/>
				</div>
			</now-footer>


		</main>
	);
}
