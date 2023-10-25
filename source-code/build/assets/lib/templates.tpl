_delimiter_2uxllzfcy97
custom/modules/link-detail-view/res/templates/fields/link-detail-view/detail.tpl
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
<p>link-detail-view:fields/link-detail-view/detail</p>
<div class="link-detail-view-{{foreignScope}}-{{idValue}}">
	{{{ recordDetail }}}
</div>
