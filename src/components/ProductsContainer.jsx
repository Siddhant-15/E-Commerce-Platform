//This is a React component named ProductsContainer, which is responsible for displaying a list of products in either grid or list view based on user selection.
import { useLoaderData } from 'react-router-dom';
//useLoaderData: This hook allows access to data loaded by the server.
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';
// It enables the usage of state in functional components.
import { BsFillGridFill, BsList } from 'react-icons/bs';

const ProductsContainer = () => {
    //{ meta } destructures the meta object from the data obtained using the useLoaderData hook.
    const { meta } = useLoaderData();
    const totalProducts = meta.pagination.total;
    //useState hook is used to manage the state of the layout (either 'grid' or 'list'). 'grid' as the default value.
    const [layout, setLayout] = useState('grid');

    const setActiveStyles = (pattern) => {
        return `text-xl btn btn-circle btn-sm ${pattern === layout
            ? 'btn-primary text-primary-content'
            : 'btn-ghost text-base-content'
            }`;
    };

    return (
        <>
            {/* HEADER */}
            <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
                <h4 className='font-medium text-md'>
                    {totalProducts} product{totalProducts > 1 && 's'}
                </h4>
                <div className='flex gap-x-2'>
                    <button
                        onClick={() => setLayout('grid')}
                        className={setActiveStyles('grid')}
                    >
                        <BsFillGridFill />
                    </button>

                    <button
                        onClick={() => setLayout('list')}
                        className={setActiveStyles('list')}
                    >
                        <BsList />
                    </button>
                </div>
            </div>

            {/* PRODUCTS */}
            <div>
                {totalProducts === 0 ? (
                    <h5 className='text-2xl mt-16'>
                        Sorry, no products matched your search...
                    </h5>
                ) : layout === 'grid' ? (
                    <ProductsGrid />
                ) : (
                    <ProductsList />
                )}
            </div>
        </>
    );
};

export default ProductsContainer;