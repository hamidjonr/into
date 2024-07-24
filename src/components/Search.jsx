import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firbese'
import { Input, } from 'antd';
import { useTranslation } from 'react-i18next';
export const Search = () => {
    const [defProducts, setDefProducts] = useState([])
    const dbDefProducts = collection(db, 'defaultProducts')
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation()
    onSnapshot(
        dbDefProducts,
        (snapshot) => {
            let defproductList = []
            snapshot.docs.forEach((doc) => {
                defproductList.push({ id: doc.id, ...doc.data() })
            })
            setDefProducts(defproductList)
        }
    ), (err) => {
        console.log(err);
    }
    return (
        <div className='bg-black h-auto'>
            <div className='searchPage bg-[#030303]'>
                <div className='pb-[30px] pt-[1px]'>
                    <div className="search-input text-center mt-[60px]">
                        <div className="input-group mb-3 m-auto max-w-[1200px]">
                            <Input type="text"
                                    onChange={(event) => { setSearchTerm(event.target.value); }}
                                    class="form-control"
                                    placeholder="Recipient's username"
                                    prefix={<SearchOutlined className='text-[24px]'/>}
                                    className='w-[1200px] rounded-lg h-[60px] border-black box-border pl-[20px] input'/>
                        </div>
                    </div>
                </div>
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {defProducts.filter((val) => {
                            if (searchTerm == "") {
                                return val;
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((product) => {
                            return (
                                <div className="p-4 md:w-1/3 ">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={product.imgUrl} alt="blog" />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{product.name}</h1>
                                            <p className="leading-relaxed mb-3">{product.desc}</p>
                                            <div className="flex items-center flex-wrap ">
                                                <Link to={`/productdetail/${product.id}`}>
                                                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">{t('LearnMore')}
                                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5l7 7-7 7"></path>
                                                        </svg>
                                                    </a>
                                                </Link>
                                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>1.2K
                                                </span>
                                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>6
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Search