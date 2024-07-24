import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'

const Card = () => {
    const [cards, setCards] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
        setCards(storedCards);
    }, []);

    const handleRemove = (productId) => {
        const updatedCards = cards.filter(product => product.id !== productId);
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
    };
    const handleBuy = () => {

    }

    return (
        <div>
            <h2 className='text-center mt-8 font-bold text-2xl'>{t("likes")}</h2>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('prImage')}</th>
                            <th scope="col" className="px-6 py-3">{t('prProductName')}</th>
                            <th scope="col" className="px-6 py-3">{t('prPrice')}</th>
                            <th scope="col" className="px-6 py-3">{t('buyurtma berish')}</th>
                            <th scope="col" className="px-6 py-3">{t('uchirish')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.length > 0 ? (
                            cards.map(product => (
                                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        <img src={product.img} alt={product.name} className='w-[80px] h-[80px] rounded-[10px]' />
                                    </td>
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">Ming: {product.price}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={handleBuy} className="font-medium text-blue-500 hover:text-blue-700 ">
                                            {t("Buyurtmani yuborish ")}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleRemove(product.id)} className="font-medium text-red-500 hover:text-red-700">
                                            {t("Dislike")}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    {t('No products found')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* <div className='mani'>

            </div> */}

        </div>
    );
};

export default Card;
