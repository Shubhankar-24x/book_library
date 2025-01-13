import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './home/Home';
import Shop from './shop/Shop';
import About from './components/About';
import Blog from './components/Blog';
import MyFooter from './components/MyFooter';
import "flowbite/dist/flowbite.min.css";
import Chatbot from './components/Chatbot';
import { CartProvider } from './contects/CartContext'; // Updated import path

const App = () => {
  return (
    <CartProvider>
      <NavBar />
      <div id="home">
        <Home />
      </div>
      <div id="shop">
        <Shop />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div className="flex-grow"> {/* Add a flex-grow container for the main content */}
        <Outlet /> {/* Move Outlet here to render nested routes above the footer */}
      </div>
      <Chatbot />
      <MyFooter />
      
    </CartProvider>
  );
};

export default App;