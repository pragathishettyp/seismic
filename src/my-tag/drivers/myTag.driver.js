import { createDriverAPI, eventually } from '@tectonic/test-api';
import { assert } from 'chai';

/**
 * Driver for my-tag component
 * Provides helper methods to interact with the click counter component
 */
export const createMyTagDriver = createDriverAPI(
	'my-tag',
	async ({ find }) => {
		// Wait for component to be rendered
		await eventually(async () => {
			const containerElement = await find('div');
			const isExisting = await containerElement.isExisting();
			assert.isTrue(isExisting);
		}, 10000);

		return {
			/**
			 * Get the current tally value displayed in the component
			 * @returns {Promise<number>}
			 */
			async getTallyValue() {
				const valueElement = await find('div > div:last-child');
				const text = await valueElement.getText();
				if (!text) return 0;
				// Extract number from "Value: X" text
				const match = text.match(/Value:\s*(\d+)/);
				return match ? parseInt(match[1], 10) : 0;
			},

			/**
			 * Click the increment button
			 * @returns {Promise<void>}
			 */
			async clickIncrementButton() {
				const incrementButton = await find('span:nth-child(2) button');
				await incrementButton.click();
			},

			/**
			 * Click the clear button
			 * @returns {Promise<void>}
			 */
			async clickClearButton() {
				const clearButton = await find('span:nth-child(3) button');
				await clearButton.click();
			},

			/**
			 * Get the text of the increment button
			 * @returns {Promise<string>}
			 */
			async getIncrementButtonText() {
				const incrementButton = await find('span:nth-child(2) button');
				return await incrementButton.getText();
			},

			/**
			 * Get the text of the clear button
			 * @returns {Promise<string>}
			 */
			async getClearButtonText() {
				const clearButton = await find('span:nth-child(3) button');
				return await clearButton.getText();
			},

			/**
			 * Get the heading text
			 * @returns {Promise<string>}
			 */
			async getHeadingText() {
				const heading = await find('h2');
				return await heading.getText();
			},

			/**
			 * Check if the component is rendered
			 * @returns {Promise<boolean>}
			 */
			async isComponentRendered() {
				const containerElement = await find('div');
				return await containerElement.isExisting();
			}
		};
	}
);
