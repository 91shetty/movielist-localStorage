### Coding Test

I want to store a list of movie names. Help me create it!
The data needs to be persisted in the `window.localStorage` so that refresh the browser they're still there.
Present the movies in a new grid component with some minimal styling. pEarn extra points for:

- Ability to remove movies from the list
- Modular CSS or similar
- Adding an HOC
- Any extra awesomeness. (Please let us know if you add anything else so we can fully appreciate it.)

### Solution

A responsive web app that saves and displays users' movie list leveraging browser's local storage capabilities.

### Flow

componentDidMount - fetch user's movie list from local storage
if the movie list is empty, show 'List is Empty'
else, display the list
Also bind the App class with beforeunload event to ensure that the state variables are stored in the local storage.

When user addes a new movie to the list, it first checks if the movie already exists in the list
if yes, error is thrown saying that the 'Movie already exists'
else, the state variable movies is updated with a new list.

When user deletes an existing movie from the list, the state variable movies is updated with a new list.

Instead of updating the local storage user every time the user makes an update, we can do so whenever the user ends their session. The state variables in React are intended tp track the state of the app throughout the user’s session. The beforeunload event binded with the class is fired when the window, the document and its resources are about to be unloaded, ensuring that the state variables are updated in the local storage.

### Styling

Bootstrap 4.3 https://getbootstrap.com/
SASS https://www.npmjs.com/package/sass

### Font

Montserrat https://www.npmjs.com/package/typeface-montserrat
