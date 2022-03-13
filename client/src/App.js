import { useEffect, useState } from 'react'
import axios from 'axios'

// styles
import './App.css';

function App() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then((res) => {
        setListOfPosts(res.data)
      })
  }, [])

  return (
    <div className="App">
      {listOfPosts.map((post, index) => (
        <div className='post' key={index}>
          <div className="title">{post.title}</div>
          <div className="content">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
