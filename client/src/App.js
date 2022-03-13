import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// pages
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

// styles
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to='/'>Home Page</Link>
          <Link to='/createpost'>Create a Post</Link>
        </div>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/createpost' component={CreatePost} />
          <Route path='/post/:id' component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
