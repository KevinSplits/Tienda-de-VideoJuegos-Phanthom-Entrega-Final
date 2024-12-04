
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import DashBoardLayout from './pages/Demo';
import RegisterPage from './pages/RegisterPage';
import LogInPage from './pages/LogInPage';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInPage />}/>
          <Route path='/login' element={<LogInPage />}/>
          <Route path='/register' element={<RegisterPage />}/>

          <Route element={<ProtectedRoute/>}>
            <Route path='/demo' element={<DashBoardLayout />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App