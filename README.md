## html-set-source-attribute

Add `source` attribute to HTML tags from source file. Source can be file of XSL template, Mustache template or raw HTML. This module returns modified content of file with `source` attribute added to HTML tags containing path to source file and line number of source tag. 


### Install

```javascript
    npm install --save-dev html-set-source-attribute
```

### Usage

```javascript
var fs = require('fs');
var setSourceAttribute = require('html-set-source-attribute');
var templatePath = 'templates/template.mustache';

fs.readFile(templatePath, 'utf8', function (err, data) {

  if (err) {
    return console.log(err);
  }

  var content = setSourceAttribute(data, templatePath);
  console.log(content);
});
```

Source `template.mustache`:

```html
	<li class="Gallery-Image gallery-item"
	        data-hh-artifact-type="{{ type }}"
	        data-hh-image-id="{{ id }}"
	    <div class="Gallery-Image-Preview gallery-item__preview"
	         style="background-image: url({{ src }});"
	         data-qa="image__img"/>

	    <button class="Gallery-Image-RemoveButton
	                   gallery-item__remove-button"
	            data-qa="image__delete">
	        &#215;
	    </button>
	</li>
```

Modified output:

```html
	<li source="templates/template.mustache:1" class="Gallery-Image gallery-item"
	        data-hh-artifact-type="{{ type }}"
	        data-hh-image-id="{{ id }}"
	    <div source="templates/template.mustache:4" class="Gallery-Image-Preview gallery-item__preview"
	         style="background-image: url({{ src }});"
	         data-qa="image__img"/>

	    <button source="templates/template.mustache:8" class="Gallery-Image-RemoveButton
	                   gallery-item__remove-button"
	            data-qa="image__delete">
	        &#215;
	    </button>
	</li>
```
