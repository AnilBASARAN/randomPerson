import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import './index.css';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import here

// Importing components
import HomePage from './pages/HomePage';
import UserList from './pages/User/components/UserList';

// Importing Redux store
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Define all your routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user-list" element={<UserList />} />
          
          {/* Optional: Add a 404 fallback route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
