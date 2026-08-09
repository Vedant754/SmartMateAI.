import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Community from './pages/Community'
import BlockTitles from './pages/BlockTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import WriteArticle from './pages/WriteArticle'
import DocQnA from './pages/DocQnA'

const App = () => {
  return (
    <div>
      <Routes>
        // Home element is rendered when the path is "/"
        <Route path="/" element={<Home />} />
        // Layout element is rendered when the path starts with "/ai" and it will render the nested routes inside it
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="block-titles" element={<BlockTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="doc-qna" element={<DocQnA />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App