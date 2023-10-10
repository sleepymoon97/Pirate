import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import PirateForm from './components/PirateForm';
import PirateList from './components/PirateList';
import PirateDetail from './components/PirateDetails';
import UserForm from './components/UserForm';

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<UserForm />}></Route>
        <Route exact path='/pirates' element={<PirateList />}></Route>
        <Route exact path='/pirates/new' element={<PirateForm />}></Route>
        <Route exact path='/pirates/:id' element={<PirateDetail />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
