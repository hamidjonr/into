import React from 'react'
import { Link } from 'react-router-dom'
import Into from '../assets/images/INTO-logo.png'
import { useTranslation } from 'react-i18next';
export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="bg-black text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col justify-center">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <img src={Into} alt="" className='w-[100px] mt-2 text-sm relative left-[40px]' />
            <p className="mt-2 text-sm text-gray-500">Into hayotingizni uzgartiradi</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 ">{t("PAGES")}</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to='likedproducts2'>
                    <a className="text-gray-600 hover:text-gray-800">Yoqtirgan mahsulotlar</a>
                  </Link>
                </li>
                <li>
                  <Link to='profile'>
                    <a className="text-gray-600 hover:text-gray-800">Profilingiz</a>
                  </Link>
                </li>
                <li>
                  <Link to='search'>
                    <a className="text-gray-600 hover:text-gray-800">Qidiruv</a>
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <a className="text-gray-600 hover:text-gray-800">Bosh sahifa</a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">{t("CATEGORIES")}</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to='kidsworld'>
                    <a className="text-gray-600 hover:text-gray-800">{t("kw")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='houses'>
                    <a className="text-gray-600 hover:text-gray-800">{t("house")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='transport'>
                    <a className="text-gray-600 hover:text-gray-800">{t("transport")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='works'>
                    <a className="text-gray-600 hover:text-gray-800">{t("work")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='fashion'>
                    <a className="text-gray-600 hover:text-gray-800">{t("fashion")}</a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">{t("CATEGORIES")}</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to='animals'>
                    <a className="text-gray-600 hover:text-gray-800">{t("animal")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='furnitures'>
                    <a className="text-gray-600 hover:text-gray-800">{t("furniture")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='electricalitems'>
                    <a className="text-gray-600 hover:text-gray-800">{t("elecItems")}</a>
                  </Link>
                </li>
                <li>
                  <Link to='services'>
                    <a className="text-gray-600 hover:text-gray-800">{t("services")}</a>
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}
export default Footer