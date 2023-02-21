import './App.css';
import PostDashboard from "./PostDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Post from "./Post";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Routes>
                  <Route path="/dashboard/:id" element={<PostDashboard/>} />
                  <Route path="/posts/:id" element={<Post/>} />
              </Routes>
          </Router>
      </header>
    </div>
  );
}

export default App;
