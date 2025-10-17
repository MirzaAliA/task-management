import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RegisterPage from '../components/RegisterPage.jsx';
import HomePage from '../components/HomePage.jsx';
import TaskPage from '../components/TaskPage.jsx';
import DetailTaskPage from '../components/DetailTaskPage.jsx';
import InsertTaskPage from '../components/InsertTaskPage.jsx';
import EditTaskPage from '../components/EditTaskPage.jsx';
import ProtectedRoute from '../middleware/ProtectedRoute.jsx';
const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <HomePage />
            </ProtectedRoute>}  />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<ProtectedRoute>
            <TaskPage />
            </ProtectedRoute>} />
          <Route path='/tasks/add' element={<ProtectedRoute>
            <InsertTaskPage />
            </ProtectedRoute>} />
          <Route path='/tasks/:task_id' element={<ProtectedRoute>
            <DetailTaskPage />
            </ProtectedRoute>} />
          <Route path='/tasks/edit/:task_id' element={<ProtectedRoute>
            <EditTaskPage />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
