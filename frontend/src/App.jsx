import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ExpenseDetail from './components/ExpenseDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<ExpenseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
