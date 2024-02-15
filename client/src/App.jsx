import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Logout from './components/Logout';
import Register from './components/Register';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';
import DeleteForm from './components/DeleteForm';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div id="main-content">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />}/>
          <Route path="/books/view/:id" element={<ViewForm />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/books/create' element={<CreateForm />} />
            <Route path='/books/edit/:id' element={<EditForm />}/>
            <Route path='/books/delete/:id' element={<DeleteForm />}/>
          </Route>

        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App
