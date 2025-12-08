// // import '../src/seismic-data-display';
import '../src/my-tag';
import '../src/component-view';
import '../src/component-context';
import '../src/component-update-properties';
import '../src/component-action-handler';
import '../src/component-lifecycle-action-handler';
import '../src/checklist-example/example-checklist';
import '../src/checklist-example/example-checklist-item';
const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `
	<!-- <seismic-data-display></seismic-data-display>
	<hr style="margin: 30px 0;"> -->
	<my-tag></my-tag>
	<!-- <component-view></component-view> -->
	<!-- <component-context></component-context> -->
	<component-update-properties></component-update-properties>
	<hr style="margin: 30px 0;">
	<component-action-handler></component-action-handler>
	<hr style="margin: 30px 0;">
	<component-lifecycle-action-handler></component-lifecycle-action-handler>
	<hr style="margin: 30px 0;">
	<example-checklist></example-checklist>
	<example-checklist-item></example-checklist-item>
`;
