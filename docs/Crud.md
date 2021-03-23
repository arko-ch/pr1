Crud allows quick strapi server api communication

```javascript
import { crud } from '../services/crud';

const $contacts = crud('contacts');

$contacts.find({ name: 'Jane' });

$contacts.findOne('contact-id-xxxx');

$contacts.find({});

$contacts.save({
  name: 'Jane',
  email: 'jane@doe.com'
});

$contacts.erase({
  _id: 'contact-id-xxxx'
})
```

Save calls with 'POST' for create new entries. It calls 'PUT' for updates. New entry is created if  ```_id``` is not passed as parameter

## query filters

```javascript
        "_eq", /* test for equality */
        "_ne", /* not equal */
        "_lt", /* less than */
        "_gt", /* greater than */
        "_lte", /* less than or equal */
        "_gte", /* greater than or equal */
        "_regex", /* regular expression */
        "_exists" /* test for existence */
        "_contains" /* test for partial text */

```

exact match:

```javascript
$contact.find({
	name: 'Jane'
})
```

regular expression match:

```javascript
$contact.find({
	name_regex: '^Jan%'
})

```

contains match:

```javascript
$contact.find({
	name_contains: 'an'
})
```

deep nested query:

```javascript
$contact.find({
	'address.city_contains': 'York'
})
```



