import './App.css';
import BookCreate from './components/BookCreate/BookCreate';
import BookUpdate from './components/BookUpdate/BoookUpdate';
import BooksList from './components/BooksList/BooksList';
import NavigationComponent from './components/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationComponent/>
        <Routes>
          <Route path='/'element={<BooksList/>}/>
          <Route path='/addBook' element={<BookCreate/>}/>
          <Route path='/updateBook/:id' element={<BookUpdate/>}/>
          <Route path='*' element={<h1>Page not found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
