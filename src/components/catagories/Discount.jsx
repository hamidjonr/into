import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';

const Discount = () => {
    const [discounts, setDiscounts] = useState([]);
    const dscType = 'Discount';

    useEffect(() => {
        const dbDefProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(dbDefProducts, (snapshot) => {
            const discList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setDiscounts(discList);
        }, (err) => {
            console.error(err);
        });
 
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <section className="text-gray-600 body-font bg-black h-[591px] ">
                <div className="container px-5 py-4 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {discounts.filter(ds => dscType === ds.type).map((disc) => (
                            <div key={disc.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={disc.name}
                                        className="object-cover object-center w-full h-full block "
                                        src={disc.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{disc.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{disc.region}</h2>
                                    <p className="mt-1">So'm {disc.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Discount;
 