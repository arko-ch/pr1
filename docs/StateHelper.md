## StateHelper

State helper allows for state manipulation - maintaining immutability & single source of truth concept, using only on action - ```setState```.

This also provides *syntactic sugar* similar to ```v-model``` of vuejs or ```ng-model``` of angular.

```jsx
import StateHelper from '../services/stateHelper'

/* defined outside of the functional components to prevent re-render when being drilled-down as props to child components */

const fs = new StateHelper();

export default MyFunctionalComponent(props) {
  const [ state, setState ] = React.useState({
    color: 'blue',
    length: 32
  })
  
  /* IMPORTANT - always connect state & setState at the root component */
  fs.useState(state, setState);
	return <div><input {...fs.model('color')} />Render</div>  
}
```

```fs``` or the state helper can be passed down to the child components as props or imported as a module.

```jsx
<MySubComponent fs={fs} {...fs.model('address')}/>
```
This translates to:

```jsx
<MySubComponent
	fs={fs}
	model='address'
	onChange={fs._onChange}
	/>
```

MySubComponent.js

```jsx
export default MySubComponent(props) {
	return <Fragment>
		<input
			{...fs.model(`${props.model}.city`)}
			/* model translates to 'address.city' */
		/>
	</Fragment>
}
```

