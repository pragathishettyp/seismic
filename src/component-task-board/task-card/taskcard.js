export default (cardData, laneIndex, cardIndex, dispatch, totalLanes) => {
	return (
		<div className="card" key={cardData.id}>
			<div className="card-content">
				<p className="card-title">{cardData.title}</p>
			</div>
		</div>
	);
};
