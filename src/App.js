import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import Chart from './pages/Chart';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<MainPage />} />
          </Route>
          <Route path='/chart' element={<PrivateRoute />}>
            <Route path='/chart' element={<Chart />} />
          </Route>
          <Route path='/login' element={<GuestRoute />}>
            <Route path='/login' element={<LogIn />} />
          </Route>
          <Route path='/signin' element={<GuestRoute />}>
            <Route path='/signin' element={<SignIn />} />
          </Route>
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
