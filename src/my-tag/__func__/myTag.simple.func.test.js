import { assert } from 'chai';

describe('My Tag Component Simple Functional Test', () => {
	let component;

	beforeEach(() => {
		// Create the component element
		component = document.createElement('my-tag');
		component.setAttribute('tally', '0');
		document.body.appendChild(component);
	});

	afterEach(() => {
		// Clean up
		if (component && component.parentNode) {
			component.parentNode.removeChild(component);
		}
		component = null;
	});

	it('should create the component', (done) => {
		// Wait for component to be defined
		setTimeout(() => {
			assert.isDefined(component);
			assert.equal(component.tagName.toLowerCase(), 'my-tag');
			done();
		}, 100);
	});

	it('should have the my-tag tag name', (done) => {
		setTimeout(() => {
			const tagName = component.tagName.toLowerCase();
			assert.equal(tagName, 'my-tag');
			done();
		}, 100);
	});

	it('should be attached to the DOM', (done) => {
		setTimeout(() => {
			assert.isTrue(document.body.contains(component));
			done();
		}, 100);
	});
});
