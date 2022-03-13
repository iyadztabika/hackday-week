import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// pages
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

// styles
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Router>
        <Link to='/createpost'>Create a Post</Link>
        <Link to='/'>Home Page</Link>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/createpost' component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
