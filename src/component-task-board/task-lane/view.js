
import card from './card';

export default (laneData, laneIndex, dispatch, totalLanes) => {
	return (
		<div className="lane" key={laneData.id}>
			<div className="lane-header">
				<h2 className="lane-title">{laneData.title}</h2>
			</div>
			<div className="lane-content">
				{laneData.cards.map((cardData, cardIndex) =>
					card(cardData, laneIndex, cardIndex, dispatch, totalLanes)
				)}
			</div>
		</div>
	);
};

// export default state => {
// 	const {
// 		properties: {title, cards}
// 	} = state;
// 	return (
// 		<div className="task-lane">
// 			<header>{title}</header>
// 			{cards.map(card => (
// 				<task-card
// 					key={card.cardId}
// 					card-id={card.cardId}
// 					title={card.title}
// 					lane={card.lane}
// 				/>
// 			))}
// 		</div>
// 	);
// }
