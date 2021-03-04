import React from 'react';
import store from "./store";
import { Provider } from "react-redux";
import Landing from './components/layout/Landing';


function App() {

  return (
    <Provider store={store}>
      <div className="d-flex" id="wrapper">
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
