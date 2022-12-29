import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import Chart from './pages/Chart';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import { AuthProvider } from './contexts/AuthContext';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<MainPage />} />
            </Route>
            <Route path='/chart' element={<PrivateRoute />}>
              <Route path='chart' element={<Chart />} />
            </Route>
            <Route path='login' element={<LogIn />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App;
