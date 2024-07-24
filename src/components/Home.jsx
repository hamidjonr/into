import React, { useState, useEffect, lazy, Suspense } from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firbese';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import kdworld from '../assets/images/1.webp'
import houses from '../assets/images/2.png'
import transport from '../assets/images/3.png'
import workimg from '../assets/images/4.png'
import animalimg from '../assets/images/5.png'
import furnitureimg from '../assets/images/6.png'
import elecItemsimg from '../assets/images/7.png';
import servicesimg from '../assets/images/8.png'
import fashionimg from '../assets/images/9.png'
import 'react-loading-skeleton/dist/skeleton.css'
import { v4 as uuidv4 } from 'uuid';
import Aos from 'aos';
import Footer from './Footer';
import { ScaleLoader } from 'react-spinners';
const Products = lazy(() => import('./Products'));
export const Home = () => {
  const { t } = useTranslation()
  useEffect(() => {
    Aos.init()
  })
  const [defProducts, setdefProducts] = useState([])
  const dbValue1 = collection(db, 'defaultProducts')
  const shuffledArray = shuffleArray(defProducts);
  const sliceDefProducts = shuffledArray.slice(0, 12)
  const [likedProducts, setLikedProducts] = useState([]);
  const [addcardMain, setaddcardMain] = useState([]);
  const divIds = [
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4()
  ];
  const [loading, setLoading] = useState(true)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  const toggleLike = (product) => {
    const isLiked = likedProducts.some(p => p.id === product.id);
    let updatedLikedProducts = [];

    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(p => p.id !== product.id);
    } else {
      updatedLikedProducts = [...likedProducts, product];
    }

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
  };




  const shopingCard = (product) => {
    const isaddCard = addcardMain.some(p => p.id === product.id);
    let updatedAddcardMain = [];

    if (isaddCard) {
      updatedAddcardMain = addcardMain.filter(p => p.id !== product.id);
    } else {
      updatedAddcardMain = [...addcardMain, product];
    }

    setaddcardMain(updatedAddcardMain);
    localStorage.setItem('addcardMain', JSON.stringify(updatedAddcardMain));
  };




  useEffect(() => {
    const storelikedProducts = JSON.parse(localStorage.getItem('LikedProducts')) || [];
    setLikedProducts(storelikedProducts);
  }, []);

  useEffect(() => {
    const storeaddcardMain = JSON.parse(localStorage.getItem('addcardMain')) || [];
    setaddcardMain(storeaddcardMain);
  }, []);

  useEffect(() => {
    const getdefProducts = async () => {
      const dbVal1 = await getDocs(dbValue1)
      setdefProducts(dbVal1.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getdefProducts()
  }, [])
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <>
      <div className="bg-black">
        <div className="pb-[30px] pt-[1px]" data-aos="zoom-in-down" data-aos-easing="linear" data-aos-duration="800">
          <div className="search-input text-center mt-[60px]">
            <div className="input-group mb-3 m-auto max-w-[1200px]">
              <Link to="search" className="btn btn-outline-secondary w-[100%]">
                <button className="btn" type="button" id="button-addon2">{t('placeholder')}</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-black" data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="800">
          <section className="max-w-[1250px] m-auto pb-[80px]">
            <h1 className="text-white text-center pt-[30px] font-[700]">{t('productType')}</h1>
            <div className="catagories-wrapper flex gap-[18px] flex-wrap mt-[55px]">
              {[
                { img: kdworld, link: 'kidsworld', color: '#ffc232', text: t('kw') },
                { img: houses, link: 'works', color: '#fb6262', text: t('house') },
                { img: transport, link: 'fashion', color: '#23e5db', text: t('transport') },
                { img: workimg, link: 'animals', color: '#ff5636', text: t('work') },
                { img: animalimg, link: 'furnitures', color: '#fff6d9', text: t('animal') },
                { img: furnitureimg, link: 'transport', color: '#3a77ff', text: t('furniture') },
                { img: elecItemsimg, link: 'electricalitems', color: '#23e5db', text: t('elecItems') },
                { img: servicesimg, link: 'sportitems', color: '#ff5636', text: t('services') },
                { img: fashionimg, link: 'houses', color: '#ffc232', text: t('fashion') }
              ].map((item, index) => (
                <div key={index} className="w-[120px] text-center">
                  <img src={item.img} alt="" className="rounded-[50%] w-[100%] mb-[10px] max-w-[90px] ml-[15px]" style={{ backgroundColor: item.color, height: '90px' }} />
                  <Link to={item.link} className="no-underline text-[#fff] cursor-pointer hover:bg-[#002f34] px-[10px] rounded-[5px] text-[18px] font-[600] hover:text-[white]">
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-black">
          <h1 className="text-white text-center font-[700] pt-[55px]">{t("Products")}</h1>
          <Suspense fallback={<ScaleLoader color="#36d7b7" size={200} cssOverride={override} />}>
            <div className="defaultProductsWrapper defaultProducts max-w-[1250px] m-auto flex gap-[10px] justify-center flex-wrap pt-[30px] pb-[80px]">
              {sliceDefProducts.map((defProduct) => {
                const isLiked = likedProducts.some(p => p.id === defProduct.id);
                const isAddedToCard = addcardMain.some(p => p.id === defProduct.id);
                return (
                  <Products
                    key={defProduct.id}
                    defProduct={defProduct}
                    isLiked={isLiked}
                    isAddedToCard={isAddedToCard}
                    toggleLike={toggleLike}
                    shopingCard={shopingCard}
                  />
                );
              })}
            </div>
          </Suspense>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default Home;