# pet-store
A **data store** / dynamic layout utility created as a *React app*, to add and view huge data using using Table and Form.

# Libraries used:
  1. React (Hooks).
  2. Redux (Store provider)
  3. Redux-thunk (Middleware fto handle async n/w calls/ data)
  4. Material UI (for Styled components).
  5. Json server: To store and send back Mockdata to my app.

# Creating the app:
Boilerplate app is created with `create-react-app` **npm** utility.
**Json server** is installed using: `npm i json-server`& is used to create a mock API end point. It consumes the `db.json` file & it supports *pagination* vey well.

# Redux/ state management:
  1. A Store configured using `npm i redux-toolkit`.
  2. I have mapped the name of the collections (or url data endpoints) as keys (state slices) in a single reducer, making state information config/ retrieval simple and DRY.
  3. Folder path: `src/redux`
      It has: *action creators* which GET/POST data, *reducer* and the actual `store`.
      The store is the *Provider* for my `App` component.

# How to add Multiple layouts?
1. I have created a Higher Order Component in `src/app-layout/Layout.js`, this renders multiple **accordions** based on the number of layouts one wishes to have on a page (This reinforces a Reusable and easy to configure layout **without distorting the App layout in case of multiple views**.
  - Pet accordion is expanded by default, since this is the main view of my app.
3. The data to be fed the the above layout field is present and configured in `src/app-layout/layout-data.js`
  `const layouts` is the data source for the layout data, its an Object here; we can use any Enumerable/ Iterable data-structure for the same.
  
## The default layout:
  - A user input `Form`
  - A `Table` to render the data already present in the database & also append user submitted form data to it.
  
## Components in a single layout: (Form and a Table)
### Form Component: (`src/components/Form.js`)
 1. To create a simple Pet data form, I declared an array of custom inputs in `src/app-layout/layout-data.js > const petStoreFormFields`.
 2. A Form can be built up with reusable other components such as: `Input`, `Select` (samples in: `src/form-fields`).
 3. It has a default *submit handler* to POST user data. **I have mapped the keys from the single object in the collection to the names to the inputs, state object (binding the value property), and hence the `onchangeHandler`**.
 4. It iterates on all form components, (consumes) all keys from a single Object of a collection/ database (except the `id` field) and creates *dynamic **controlled components*** based on the `type` property for the inputs.
 5. TL;DR: Input components have configurable `props` (such as: options, visibilty, css classes, and other HTML attributes). 
    To render a `name` text input, I used `src/form-fields/Input.js`, provided it *props* from `const nameFieldProps` in `src/app-layout/layout-data.js`.
 6. We can also add custom validations to each inputs (a todo for my future).

### Table Component: (`src/components/Table.js`)
  1. This contains a resusable table which generates dynamic *table header* using the keys of single Object of a collection/ database.
  2. The table data is constructed from the values of the responses returned for the GET request to a collection (api endpoint).
  3. Table implements 'Pagination', so that you only retrieve page specific data (eg: 10 results) and not the entire resultsv (which can cause major performance downgrades).
  4. Once the data is retrived (on page load/change), its stored in **Redux**, so as to nullify the need to call GET requests on every page change. 
  *Note: If on a particular page, the number of records on a page as lesser than the `rowsPerPage`, then you can see data submitted from the `Form` being appended at the bottom; else you need to jump to the last page to check the submitted data.*
  
  >> Please comment if you need any help/ fork for suggestion :)



