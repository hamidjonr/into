import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/INTO-logo.png'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import Home from './components/Home';
import { useEffect } from 'react';
import { SignIn } from './components/Signin';
import Profile from './components/Profile';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { auth } from '../src/firbese';
import ProductDetails from './components/ProductDetails';
import LikedProducts from './components/LikedProducts';
import Works from './components/catagories/Works';
import KidsWorld from './components/catagories/KidsWorld';
import Animals from './components/catagories/Animals';
import Discount from './components/catagories/Discount';
import ElecItems from './components/catagories/ElecItems';
import Exchange from './components/catagories/Exchange';
import Fashion from './components/catagories/Fashion';
import Furnitures from './components/catagories/Furnitures';
import Houses from './components/catagories/Houses';
import Services from './components/catagories/Services';
import SportItems from './components/catagories/SportItems';
import Transports from './components/catagories/Transports';
import Search from './components/Search';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Breadcrumbs from './components/Breadcrumbs';
import Card from './components/Card';
function App() {
  const { t } = useTranslation()
  useEffect(() => {
    Aos.init()
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
      }).catch((err) => {
        console.log(err);
      })
  }
  const items = [
    {
      key: '1',
      danger: true,
      label: (
        <button>
          <Link to='/' className='text-black'><p>{t("Home")}</p></Link>
        </button>
      )
    },
    {
      key: '2',
      danger: true,
      label: (
        <button>
          <Link to='/search' className='text-black'><p>{t("placeholder")}</p></Link>
        </button>
      )
    },
    {
      key: '3',
      danger: true,
      label: (
        <button><LanguageSelector /></button>
      )
    },
    {
      key: '4',
      danger: true,
      label: (
        <button onClick={handleSignOut}>Log Out</button>
      )
    },

  ];
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : navigate('signin');
  }
  return (
    <>
     <nav className='bg-gray-700 py-2 navs' data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="800">
    <div className="nav-wrapper flex items-center max-w-screen-xl mx-auto justify-between">
        <div className="nav-logo w-20">
            <Link to='/'>
                <img src={logo} alt="Site Logo" />
            </Link>
        </div>
        <div className="nav-right-side flex gap-12 items-center">
            <div className='flex gap-4 hidden md:flex items-center'>
                <Link to='/' className='text-white text-lg hover:text-gray-300'>
                    <p>{t("Home")}</p>
                </Link>
                <Link to='/search' className='text-white text-lg hover:text-gray-300'>
                    <p>{t("placeholder")}</p>
                </Link>
                <LanguageSelector />
            </div>
            <div className="nav-user-like flex gap-8 items-center">
                <Link to='/card' aria-label="Shopping Cart">
                    <i className="fa-solid fa-bucket text-xl text-white hover:text-gray-300"></i>
                </Link>
                <Link to='/likedproducts2' aria-label="Liked Products">
                    <FaRegHeart className='text-xl text-white hover:text-gray-300' />
                </Link>
                <Link to='profile'>
                    <div className="profile flex items-center gap-4">
                        <FaUser className='text-xl text-white' />
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()} aria-label="Profile Menu">
                                <Space className='text-white text-lg font-bold cursor-pointer flex items-center'>
                                    {t('profile')}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Link>
            </div>
            <div className="nav-button">
                <Link to='profile'>
                    <button className='bg-white py-2 px-6 rounded text-black font-bold text-lg hover:bg-gray-200'>
                        {t('Admin')}!
                    </button>
                </Link>
            </div>
        </div>
    </div>
</nav>

      <Breadcrumbs />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='signup' element={<Signup />} /> */}
          <Route path='signin' element={<SignIn />} />
          <Route path='productdetail/:productId' element={<ProductDetails />} />
          <Route path='profile' element={<RequiredAuth> <Profile /></RequiredAuth>} />
          <Route path='likedproducts2' element={<LikedProducts />}></Route>
          <Route path='works' element={<Works />}></Route>
          <Route path='kidsworld' element={<KidsWorld />}></Route>
          <Route path='houses' element={<Houses />}></Route>
          <Route path='animals' element={<Animals />}></Route>
          <Route path='exchange' element={<Exchange />}></Route>
          <Route path='fashion' element={<Fashion />}></Route>
          <Route path='furnitures' element={<Furnitures />}></Route>
          <Route path='services' element={<Services />}></Route>
          <Route path='sportitems' element={<SportItems />}></Route>
          <Route path='transport' element={<Transports />}></Route>
          <Route path='electricalitems' element={<ElecItems />}></Route>
          <Route path='discount' element={<Discount />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='card' element={<Card />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App

