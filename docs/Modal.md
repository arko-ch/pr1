## Modal

Modal provides a helper function to popup modals.

```jsx
import $modal from 'app/services/modal';

export default MyComponent(props) {

	const doTheDelete = () => {
		console.log('delete');
	}
	
	const showModal = (evt) => {
		evt.preventDefault();
		$modal.confirm({
			'title': 'Delete',
			'message': 'Are you sure',
			actions: [
				{ 'title': 'Yes', action: doTheDelete }
				// 'cancel' is provided by default
			]
		})
	}
	return <button onClick={showModal}>Delete</button>
}

```

### custom modal components

Modals can show a custom component instead of a simple message

```jsx
	$modal.confirm({
		'title': 'My Modal',
		'component': (props) => {
			return <h2>This is the message within the modal component</h2>
		}
	})
```

### state

Modal's state is stored in the ui context (``` app/ui/store ```)

Custom modal components may save action results in the store:

```jsx
	uiStore.dispatch(ui.setState{
		'modal.result': [ ... itemsSelected ]
	}))

```