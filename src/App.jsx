import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Edit from './pages/Edit'
import './App.css'
import PostDetail from './pages/PostDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/edit/:id" element={<Edit/>}>Home</Route>
          <Route path="/post-detail/:id" element={<PostDetail/>}>Home</Route>
          <Route path="/create" element={<CreatePost/>}>Create Post</Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
