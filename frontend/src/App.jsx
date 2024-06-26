import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import Register from "./pages/register/Register";
import Message from "./pages/user/message/Message";
import Table from "./pages/admin/Tables/Table";
import Staff from "./pages/admin/Staffs/Staff";
function App() {
	const [pageTitle, setPageTitle] = useState('Home');

	const titleMap = [
		{ path: '', title: 'Home' },
		{ path: '/login', title: 'Login' },
		{ path: '/register', title: 'Register' },
		{ path: '/admin/table', title: 'Table List' },
		{ path: '/admin/staff', title: 'Staff List' }

	]
	let curLoc = useLocation();
	useEffect(() => {
		const curTitle = titleMap.find(item => item.path === curLoc.pathname)
		if (curTitle && curTitle.title) {
			setPageTitle(curTitle.title)
			document.title = curTitle.title
		}
	}, [curLoc])
	const { authUser } = useAuthContext();
	return (
		<div className=' h-full'>
			<Routes >
				<Route path=''>
					{/* <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} /> */}
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/message' element={<Message />} />

				</Route>
				<Route path='/admin'>
					{/* <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} /> */}
					{/* <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} /> */}
					<Route path='/admin/register' element={<Register />} />
					<Route path='/admin/table' element={<Table />} />
					<Route path='/admin/staff' element={<Staff />} />
				</Route>
			</Routes >
			<Toaster />
		</div >
	);
}

export default App;
