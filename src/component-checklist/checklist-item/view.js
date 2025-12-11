import '@servicenow/now-toggle';
import '@servicenow/now-input';
import '@servicenow/now-button';
import {TOGGLE_CLICKED, DELETE_CLICKED} from '../constants';

export default (item, index, dispatch) => {
	console.log('Item rendering:', index);

	return (
		<tr key={index}>
			<td>
				<input
					type="checkbox"
					checked={item.completed}
					on-change={() => {
						console.log('TOGGLE CLICKED!!!', index);
						dispatch('TOGGLE_CLICKED', {index});
					}}
				/>
			</td>
			<td className="now-table-toggle-cell">
                <now-toggle size="md" label=""
                checked={item.completed}
                on-click={(e) => {
                    console.log('Toggle event:', e);
                    console.log('Toggle detail:', e.detail);
                    dispatch('TOGGLE_CLICKED', {index})}
                }/>
            </td>

			{/* <td className="now-table-toggle-cell">
				<label className="toggle-switch">
					<input
						type="checkbox"
						checked={item.completed}
						on-change={() => dispatch(TOGGLE_CLICKED, {index})}
					/>
				</label>
				<span className="toggle-slider"></span>
			</td> */}

			<td>{item.task}</td>
			<td>
				<button on-click={() => {
					console.log('DELETE CLICKED!!!', index);
					dispatch('DELETE_CLICKED', {index});
				}}>
					X
				</button>
			</td>
		</tr>
	);
}
