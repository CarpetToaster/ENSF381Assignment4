import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js';
import CoursesPage from './components/CoursesPage.js';
import LoginForm from './components/LoginForm.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='Home' element={<Homepage />} />
          <Route path='Courses' element={<CoursesPage />} />
          <Route path='Login' element={<LoginForm />} />
          <Route path='*' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
