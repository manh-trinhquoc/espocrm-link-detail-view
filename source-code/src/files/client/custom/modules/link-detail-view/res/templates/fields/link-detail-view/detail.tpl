{{#if url}}
	{{#if iconHtml}}
		{{{iconHtml}}}
	{{/if}}
	<a href="{{url}}">{{nameValue}}</a>
{{else}}
	{{#if valueIsSet}}
		<span class="none-value">{{translate 'None'}}</span>
	{{else}}
		<span class="loading-value">...</span>
	{{/if}}
{{/if}}

<div style="padding:5px" class="link-detail-view parent-{{parentScope}}-{{parentId}}"></div>
