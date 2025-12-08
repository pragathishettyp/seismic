import { assert } from 'chai';
import {
	fixture,
	willDispatch,
	flushQueue,
	setupChaiAxe,
	element
} from '@tectonic/test-api';
import renderer from '@servicenow/ui-renderer-snabbdom';
import '../index';
import { createMyTagDriver } from '../drivers/myTag.driver';

setupChaiAxe();

describe('My Tag Component Functional Tests', () => {
	// Create fixture with JSX syntax
	const { create, destroy } = fixture(
		<my-tag tally={0} />,
		renderer
	);

	let myTagComponent;
	let driver;

	before(async () => {
		myTagComponent = await create();
		driver = await createMyTagDriver(myTagComponent, element);
	});

	after(async () => {
		myTagComponent = null;
		driver = null;
		await destroy();
	});

	it('should render the component with default tally value', async () => {
		const isRendered = await driver.isComponentRendered();
		assert.isTrue(isRendered);

		const tallyValue = await driver.getTallyValue();
		assert.equal(tallyValue, 0);
	});

	it('should display the correct heading', async () => {
		const headingText = await driver.getHeadingText();
		assert.equal(headingText, 'Click Counter');
	});

	it('should have increment and clear buttons with correct labels', async () => {
		const incrementButtonText = await driver.getIncrementButtonText();
		const clearButtonText = await driver.getClearButtonText();

		assert.equal(incrementButtonText, 'Increment');
		assert.equal(clearButtonText, 'Clear');
	});

	it('should increment tally when increment button is clicked', async () => {
		await driver.clickIncrementButton();
		await flushQueue();

		const tallyValue = await driver.getTallyValue();
		assert.equal(tallyValue, 1);
	});

	it('should increment tally multiple times', async () => {
		// Click increment 3 more times (starting from 1)
		await driver.clickIncrementButton();
		await flushQueue();
		await driver.clickIncrementButton();
		await flushQueue();
		await driver.clickIncrementButton();
		await flushQueue();

		const tallyValue = await driver.getTallyValue();
		assert.equal(tallyValue, 4);
	});

	it('should reset tally to 0 when clear button is clicked', async () => {
		await driver.clickClearButton();
		await flushQueue();

		const tallyValue = await driver.getTallyValue();
		assert.equal(tallyValue, 0);
	});

	it('should dispatch TALLY_CHANGED action when property changes', async () => {
		const action = await willDispatch(
			myTagComponent,
			'TALLY_CHANGED',
			async () => {
				await driver.clickIncrementButton();
				await flushQueue();
			}
		);

		assert.isDefined(action);
		assert.equal(action.type, 'TALLY_CHANGED');
		assert.isDefined(action.payload);
		assert.equal(action.payload.tally, 1);
	});

	it('should dispatch TALLY_CHANGED action when clearing', async () => {
		// First increment to have a non-zero value
		await driver.clickIncrementButton();
		await flushQueue();

		const action = await willDispatch(
			myTagComponent,
			'TALLY_CHANGED',
			async () => {
				await driver.clickClearButton();
				await flushQueue();
			}
		);

		assert.isDefined(action);
		assert.equal(action.type, 'TALLY_CHANGED');
		assert.equal(action.payload.tally, 0);
	});

	it('should accept custom initial tally property', async () => {
		// Destroy current component and create a new one with custom tally
		await destroy();

		const { create: createCustom, destroy: destroyCustom } = fixture(
			<my-tag tally={10} />,
			renderer
		);

		const customComponent = await createCustom();
		const customDriver = await createMyTagDriver(customComponent, element);

		const tallyValue = await customDriver.getTallyValue();
		assert.equal(tallyValue, 10);

		// Cleanup
		await destroyCustom();

		// Recreate the original component for remaining tests
		myTagComponent = await create();
		driver = await createMyTagDriver(myTagComponent, element);
	});

	it('passes axe accessibility check', async () => {
		await assert.isAccessible(myTagComponent);
	});
});
