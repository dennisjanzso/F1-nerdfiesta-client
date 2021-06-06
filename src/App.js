import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import RouterSwitch from './components/router_switch';
import Navbar from './components/navbar';
import Footer from './components/UI/footer';

function App() {
  return (
    <Router>
      <Navbar />
      <RouterSwitch />
    </Router>
  );
}

export default App;
