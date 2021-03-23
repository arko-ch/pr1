## Icons

Icons used are ```FontAwesome``` and ```IonIcons```.  Pe-7 icons will be removed.

For efficient and uniform importing of icons use the wrapper provided in ```app/icons```

```jsx
	import { FontAwesomeIcon, IonIcon, Icons as library } from 'app/icons';
	
	...
	
	<FontAwesomeIcon icon={library.faCoffee}></FontAwesomeIcon>
	<IonIcon icon={library.gear}></IonIcon/>
```

## Icon registry

Not all icons in the FontAwesome & IonIcons library will be loaded. Each icons to be used must be pre-registered:

```jsx
/* app/icons/registry_fontawesome */
import faCogs from 'fortawesome/faCogs';

...

library.add(faCogs, 'faCogs');

/* app/icons/registry_ionicons */

...

library.add(IosResize, 'IosResize');

```


