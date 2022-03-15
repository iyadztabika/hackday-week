import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'
import axios from 'axios';

// context
import { AuthContext } from './helpers/AuthContext';

// pages
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';

// styles
import './App.css';

function App() {
  // authState, with username, id and status
  const [authState, setAuthState] = useState({username: "", id: 0, status: false})

  const history = useHistory()

  useEffect(() => {
    axios
      // get method
      // send access token from headers
      .get("http://localhost:5000/auth/token", { headers: {accessToken: localStorage.getItem("accessToken")} })
      .then(res => {
        // if access token not match
        if (res.data.error) {
          setAuthState({...authState, status: false})
        // if access token match
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username: "", id: 0, status: false})
    history.push('/login')
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
                </>
              ) : (
                <>
                  <Link to='/'>Home Page</Link>
                  <Link to='/createpost'>Create a Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={logout}>Logout</button> }
            </div>
          </div>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/post/:id' component={Post} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='*' exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
