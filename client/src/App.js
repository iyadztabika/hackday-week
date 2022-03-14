import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// pages
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';

// styles
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to='/'>Home Page</Link>
          <Link to='/createpost'>Create a Post</Link>
          {!localStorage.getItem('accessToken') && (
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
    </div>
  );
}

export default App;
