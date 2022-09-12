import {ConnectedTable} from './components/Table';
import { ConnectedForm } from './components/Form';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {layouts} from './app-layout/layout-data';
import LayoutComponent from './app-layout/Layout';
import {store} from './redux-store/store';
import logo from './logo.svg';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {Object.keys(layouts).map(view => {
            const {formComponents, tableDataSource, componentTitle, dataTitle, expanded} = layouts[view];
            return (
              <LayoutComponent key={dataTitle} componentTitle={componentTitle} expanded={expanded}>
                  {/* Reusable Form with customizable components:i/p field, submit handler */}
                  <ConnectedForm formComponents={formComponents} tableDataSource={tableDataSource} />
                  {/* Table name my be customized , instead of reusing Accordion title */}
                  <ConnectedTable collection={tableDataSource} tableName={dataTitle}/>
              </LayoutComponent>)
        })
        }
      </div>
    </Provider>
  );
}

export default App;
