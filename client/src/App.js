import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// pages
import Home from './pages/Home';

// styles
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Router>
        <Link to='/createpost'>Create a Post</Link>
        <Switch>
          <Route path='/' component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
