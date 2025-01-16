import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import EditUsers from './components/EditUsers/EditUsers';
import Users from './components/Users/Users';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="editUsers" element={<EditUsers />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
