_delimiter_unlleafh39
custom/modules/link-detail-view/res/templates/fields/link-detail-view/edit.tpl
<div class="input-group">
	<input class="main-element form-control" type="text" data-name="{{nameName}}" value="{{nameValue}}" autocomplete="espo-{{name}}" placeholder="{{translate 'Select'}}" spellcheck="false">
	<span class="input-group-btn">
		{{#if createButton}}
			<button data-action="createLink" class="btn btn-default btn-icon" type="button" title="{{translate 'Create'}}">
				<i class="fas fa-plus"></i>
			</button>
		{{/if}}
		<button data-action="selectLink" class="btn btn-default btn-icon" type="button" title="{{translate 'Select'}}">
			<i class="fas fa-angle-up"></i>
		</button>
		<button data-action="clearLink" class="btn btn-default btn-icon" type="button">
			<i class="fas fa-times"></i>
		</button>
	</span>
</div>
<input type="hidden" data-name="{{idName}}" value="{{idValue}}">

<div style="padding:5px; position:relative;" class="link-detail-view field-{{fieldName}}"></div>

_delimiter_unlleafh39
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
<div style="padding:5px" class="link-detail-view field-{{fieldName}}"></div>
