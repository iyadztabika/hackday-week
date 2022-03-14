import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// context
import { AuthContext } from './helpers/AuthContext';

// pages
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';

// styles
import './App.css';

function App() {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true)
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to='/'>Home Page</Link>
            <Link to='/createpost'>Create a Post</Link>
            {!authState && (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}
          </div>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/post/:id' component={Post} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
