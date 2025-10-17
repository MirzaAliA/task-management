import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RegisterPage from '../components/RegisterPage.jsx';
import HomePage from '../components/HomePage.jsx';
import TaskPage from '../components/TaskPage.jsx';
import InsertTaskPage from '../components/InsertTaskPage.jsx';
import EditTaskPage from '../components/EditTaskPage.jsx';
import ProtectedRoute from '../middleware/ProtectedRoute.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <LogoutButton />
            <HomePage />
            </ProtectedRoute>}  />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<ProtectedRoute>
            <LogoutButton />
            <TaskPage />
            </ProtectedRoute>} />
          <Route path='/tasks/add' element={<ProtectedRoute>
            <LogoutButton />
            <InsertTaskPage />
            </ProtectedRoute>} />
          <Route path='/tasks/edit/:task_id' element={<ProtectedRoute>
            <LogoutButton />
            <EditTaskPage />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
