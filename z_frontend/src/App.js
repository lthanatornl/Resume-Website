import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from './actions/user';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Project/Projects'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import AdminPanel from './components/AdminPanel/AdminPanel';
import Graduation from './components/AdminPanel/Graduation';
import Project from './components/AdminPanel/Project';
import Loading from './components/Loading/Loading';



function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  return (
  <Router>
    {loading ? (<Loading/>
    ) : (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About about={user.about} graduation={user.graduation}/>} />
      <Route path="/projects" element={<Projects projects={user.projects} />} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Account" element={ isAuthenticated ? <AdminPanel/>:<Login/>} />
      <Route path="/thanatorn/graduation" element={ isAuthenticated ? <Graduation/>:<Login/>} />
      <Route path="/thanatorn/project" element={ isAuthenticated ? <Project/>:<Login/>} />
    </Routes>
    </>
    )}
  </Router>
  );
}

export default App;
