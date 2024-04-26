import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import Home from './pages/Home'
import PostDetail from './pages/PostDetails'
import EditPost from './pages/EditPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/edit/:id" element={<EditPost/>}>Home</Route>
          <Route path="/post-detail/:id" element={<PostDetail/>}>Home</Route>
          <Route path="/create" element={<CreatePost/>}>Create Post</Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
