export const dropBehavior = {
	name: 'dropBehavior',
	eventHandlers: [
		{
			events: ['dragover'],
			effect({action: {payload: {event}}}) {
				event.preventDefault();
			}
		},
		{
			events: ['drop'],
			effect(coeffects) {
				const {action: {payload: {options, event}}} = coeffects;
				const data = JSON.parse(event.dataTransfer.getData('application/json'));
				options.onDrop(data, coeffects);
			}
		}
	]
};

export const dragBehavior = {
	name: 'dragBehavior',
	properties: {draggable: {default: 'true', reflect: true}},
	eventHandlers: [
		{
			events: ['dragstart'],
			effect(coeffects) {
				const {action: {payload: {options, event}}} = coeffects;
				const data = options.getData(coeffects);
				event.dataTransfer.setData('application/json', JSON.stringify(data));
			}
		}
	]
};
