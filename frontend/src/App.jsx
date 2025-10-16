import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RegisterPage from '../components/RegisterPage.jsx';
import HomePage from '../components/HomePage.jsx';
import TaskPage from '../components/TaskPage.jsx';
import DetailTaskPage from '../components/DetailTaskPage.jsx';
import InsertTaskPage from '../components/InsertTaskPage.jsx';
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<TaskPage />} />
          <Route path='/tasks/add' element={<InsertTaskPage />} />
          <Route path='/tasks/:task_id' element={<DetailTaskPage />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
