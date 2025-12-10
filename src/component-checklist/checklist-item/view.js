import '@servicenow/now-toggle';
import '@servicenow/now-input';
import '@servicenow/now-button';
import {TOGGLE_CLICKED, DELETE_CLICKED} from '../constants';

export default (item, index, dispatch) => {
	return (
		<tr key={index}>
			<td className="now-table-toggle-cell">
				<now-toggle size="md" label=""
				on-change={(e) => dispatch(TOGGLE_CLICKED, {index})} />
			</td>
			<td className="now-table-input-cell">
				<now-input size="md" label=""
				value={item.task}
				// on-change={(e) => dispatch(CHANGE_CLICKED, {index})}
				// on-change={(e) => dispatch('UPDATE_TASK', {index, task: e.detail.value})}
				/>
			</td>

			<td className="now-table-delete-cell">
				<now-button-iconic size="md" label="Delete"
				icon="close-outline"
				variant="tertiary"
				on-click={() => dispatch(DELETE_CLICKED, {index})}/>
			</td>
		</tr>
	);
}
