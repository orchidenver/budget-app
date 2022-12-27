import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import Chart from './pages/Chart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='chart' element={<Chart />} />
        <Route path='login' element={<LogIn />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App;
