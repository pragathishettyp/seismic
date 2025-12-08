import '@servicenow/now-toggle';
// import '@servicenow/now-button-iconic';
// import '@servicenow/now-label-value-inline';
import '@servicenow/now-heading';
import '@servicenow/now-loader';
import '@servicenow/now-button';
import '@servicenow/now-label-value';
import {
	CHECKLIST_ITEM_UPDATED,
	REMOVE_BTN_CLICKED,
	ENTER_KEY_CODE,
	ESC_KEY_CODE
} from '../constants';

export default (state, {dispatch, updateProperties}) => {
	const {
		properties: {itemId, label, active, editing}
	} = state;
	const setEditing = editing => updateProperties({editing});

	const labelCell = (
		<span
			className="now-checklist-item-cell"
			role="cell"
			on-dblclick={() => setEditing(true)}>
			{label}
		</span>
	);

	const inputCell = (
		<span className="now-checklist-item-cell" role="cell">
			<input
				className="now-checklist-item-input"
				value={label}
				hook-insert={vnode => vnode.elm.focus()}
				on-keydown={({keyCode, target: {value: label}}) => {
					const newLabel = label.trim();
					if (keyCode === ENTER_KEY_CODE) {
						setEditing(false);
						if (newLabel) {
							dispatch(CHECKLIST_ITEM_UPDATED, {
								itemId,
								short_description: newLabel
							});
						}
					} else if (keyCode === ESC_KEY_CODE) {
						setEditing(false);
					}
				}}
				on-blur={() => setEditing(false)}
			/>
		</span>
	);

	return (
		<div className="now-checklist-item" role="row">
			<div className="now-checklist-item-cell -center" role="cell">
				<now-toggle
					checked={active}
					disabled={editing}
					size="md"
					label="Mark as done"
					on-change={() => {
						dispatch(CHECKLIST_ITEM_UPDATED, {
							itemId,
							active: !active
						});
					}}
				/>
			</div>
			{editing ? inputCell : labelCell}
			<span className="now-checklist-item-cell -center" role="cell">
				<now-button-iconic
					icon="close-outline"
					tooltipContent="Delete"
					size="md"
					variant="tertiary"
					on-click={() => {
						dispatch(REMOVE_BTN_CLICKED, {itemId});
					}}
				/>
			</span>
		</div>
	);
};
