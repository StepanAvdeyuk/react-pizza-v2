import React from 'react'
import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Cart from './pages/Cart';
import PizzaInfo from './components/PizzaInfo';

const App: React.FC = () => {
	return (
		<div className="wrapper">
		<Header/>
		<div className="content">
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/cart" element={<Cart/>}/>
			<Route path="/pizza/:id" element={<PizzaInfo/>}/>
			<Route path="*" element={<NotFound/>}/>
		</Routes>
		</div>
	  </div>
	);
}

export default App;
