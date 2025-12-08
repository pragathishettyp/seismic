import '../src/example-hello-world';
import '../src/seismic-data-display';

const el = document.createElement('DIV');
document.body.appendChild(el);

// Add some basic styling
const style = document.createElement('style');
style.textContent = `
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		margin: 0;
		padding: 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}
	.container {
		max-width: 1400px;
		margin: 0 auto;
	}
	.header {
		text-align: center;
		color: white;
		margin-bottom: 40px;
	}
	.header h1 {
		font-size: 48px;
		margin: 0 0 16px 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
	.component-section {
		background: white;
		padding: 24px;
		border-radius: 12px;
		margin-bottom: 30px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}
	.component-section h2 {
		margin-top: 0;
		color: #2c3e50;
		border-bottom: 2px solid #3498db;
		padding-bottom: 12px;
	}
`;
document.head.appendChild(style);

el.innerHTML = `
	<div class="container">
		<div class="header">
			<h1>🌊 Seismic Component Library</h1>
			<p>ServiceNow Next Experience UI Framework Components</p>
		</div>
		
		<div class="component-section">
			<h2>Seismic Data Display Component</h2>
			<p>A comprehensive component demonstrating all ServiceNow UI Framework concepts</p>
			<seismic-data-display></seismic-data-display>
		</div>
		
		<div class="component-section">
			<h2>Seismic Data Display - Custom Configuration</h2>
			<p>Same component with custom properties</p>
			<seismic-data-display
				title="Custom Seismic Monitor"
				description="This instance has custom properties configured"
				is-active="false"
				show-advanced="true">
			</seismic-data-display>
		</div>
		
		<div class="component-section">
			<h2>Example Hello World Component</h2>
			<p>Basic starter component</p>
			<example-hello-world></example-hello-world>
		</div>
	</div>
`;
