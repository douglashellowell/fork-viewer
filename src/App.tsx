import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import GetForksPage from './pages/GetForksPage/GetForksPage';
import Home from './pages/Home/Home';
import StudentManagement from './pages/StudentManagement/StudentManagement';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/get-forks" element={<GetForksPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
