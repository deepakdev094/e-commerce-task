import { useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import MyContext from './context/myContext'
import { getCoupons } from './service/adminService'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [coupons, setCoupons] = useState([])
  const [orderCount, setOrderCount] = useState(0);
  
  const contextData = {
    cartItems,
    setCartItems,
    coupons,
    setCoupons,
    orderCount,
    setOrderCount,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCoupons();
      setCoupons([...response]);
    }
    fetchData()
    localStorage.setItem('userId', 1)
  }, [])

  return (
    <MyContext.Provider value={contextData}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </MyContext.Provider>

  )
}

export default App
