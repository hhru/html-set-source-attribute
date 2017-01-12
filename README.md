## html-set-source-attribute

Добавляет атрибут source в html-теги источника. Источником могут быть файлы xsl-шаблонов, шаблоны mustache, или, например, обычный html. Модуль возвращает преобразованное содержимое файла с добавленным в html-теги атрибутом source, содержащим путь к файлу-источнику и номер строки, в которой прописан текущий тег.

### Установка

```javascript
    npm install --save-dev html-set-source-attribute
```
### Пример использования

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
Содержимое исходного файла template.mustache:

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

Результат после преобразования:

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