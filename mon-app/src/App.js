import React from 'react';
import FetchData from './components/FetchData';
import CreateItem from './components/CreateItem';
import EditItem from './components/EditItem';

function App() {
  return (
    <div className="App">
      <FetchData />
      <CreateItem />
      <EditItem />
    </div>
  );
}

export default App;
