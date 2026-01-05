
import '@servicenow/now-heading';

export default (state, {updateState, dispatch, updateProperties}) => {
	const {lanes} = state
	return (
			<div className='taskboard'>
				<now-heading level="1">Task Board</now-heading>
				<div className='taskboard-content'>
					{
						// lanes.map(lane => (
						// 	<div key={lane.laneId} className='lane'>
						// 		<now-heading level="2">{lane.title}</now-heading>
						// 	</div>
						// ))
						lanes.map((laneData, laneIndex) =>
							lane(laneData, laneIndex, dispatch, lanes.length)
						)

					}
				</div>
			</div>
	);
}
