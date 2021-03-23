The code generator builds code from a templates.

It takes the following input:

* strapi collection model name
* strapi model name in pluralized form

```sh
yarn generate --model product --plural products
```

or simply

```sh
yarn generate product
```

to re-generate all previously generated code

```sh
yarn generate:all
```

Output filles will be saved under

```
app
-- settings
----- {Model}
---------- {Model}List.js
---------- {Model}View.js
---------- config.js
---------- schema.js
---------- custom.js
---------- routes.js
```

# templates

Templates for these generated files are located in 'generate\templates'

## List

The list produces a table or grid of a models's data. The grid is searchable. Items displayed on the grid may be turned on or off at the strapi panel. 

## View

The view is an editable form of a model. Save, Delete are implemented.

Form fields can display date, checkbox, combobox components depending on the field type as defined in the strapi model.

Default field components are in ```app/components/forms```. **add more components here**.

Each field may also be customized. See *customization*.

# lock

To prevent override hand-edited customisation. Edit the config.js file to lock certian generated files.

```json
config.js
{
    "lock": {
        "{Model}List.js": true
    }
}
```

# customization

Add customized code, behaviors in the ```custom.js``` file.
See ```app/settings/commitment.js``` for sample customization.

# client - server

The generator depends on the strapi collections or models. For every change in strapi. The following must be run to sync the model shema of the server and the app.

```sh
yarn generate schema && yarn generate:all
```
# model

*Model* is a strapi collection. In creating a model or collection, strapi conventions must be followed - ie. camel cased, singular names, etc...


