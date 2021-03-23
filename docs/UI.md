## toolbar

Add items to the toolbar:

```jsx
import { Store as UIStore } from './app/ui/store';

export default MyComponent(props) {
	const uiStore = React.useContext(UIStore);
	
	const mySave = () => {
		console.log('saving...');
	}
	
	React.useEffect(() => {
		// on mount
		const originalItems = [ ...uiStore.state.toolbar.items ]
		uiStore.dispatch(uiStore.setState({
			'toolbar.items': [
				... uiStore.state.toolbar.items,
				{
					'label': 'Save',
					'icon': 'save',
					action: mySave
				}
			]
		
			// on unmount
			return () => {
          uiStore.dispatch(uiStore.setState({
          	'toolbar.items': originalItems
          });
			}
		}))		
		
	}, []) // [] ensures effect is run only once
}
```

## navbar and panel

Navbar is the menu or sidebar on the left side. Panel is the sidebar on the right. Add items the same way as the toolbar:

```jsx
uiStore.state.navbar;
uiStore.state.panel;
```
compact mode or icon mode:

```jsx
uiStore.dispatch(uiStore.setState({
	'navbar.compact': true,
  'navbar.shown': true
}))
```

## search bar

Take control of the search bar

```jsx
export default MyComponent(props) {
	const uiStore = React.useContext(UIStore);
	
	React.useEffect(() => {
		// on mount
		const originalItems = [ ...uiStore.state.toolbar.items ]
		uiStore.dispatch(uiStore.setState({
			'search.shown': true,
			'search.text': ''
			});
		
			// on unmount
			return () => {
        uiStore.dispatch(uiStore.setState({
          'search.shown': false,
          'search.text': ''
          });
			}
		}))		
		
	}, []) // [] ensures effect is run only once
	
	/* listen to search.text changes */
	React.useEffect(async () => {
		let res = await fetch('/api/search',
			{ searchKeyword: uiStore.state.search.text }
		)
	}, [ uiStore.state.search.text ])
}
```