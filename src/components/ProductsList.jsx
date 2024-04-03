//This code defines a React functional component called ProductList, which is used to render a list of products.
import { formatPrice } from '../utils';
import { Link, useLoaderData } from 'react-router-dom';

const ProductList = () => {
    //the useLoaderData() hook is called to retrieve data. The products object is destructured from the result.
    const { products } = useLoaderData();

    return (
        <div className='mt-12 grid gap-y-8'>
            {/* The products.map() function iterates over each product in the products array and returns a JSX element for each one.*/}
            {products.map((product) => {
                //The product title, company, and price are extracted from the product.attributes object.
                const { title, price, image, company } = product.attributes;
                const dollarsAmount = formatPrice(price);

                return (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
                    >
                        <img
                            src={image}
                            alt={title}
                            className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
                        />
                        <div className='ml-0 sm:ml-16'>
                            <h3 className='capitalize font-medium text-lg'>{title}</h3>
                            <h4 className='capitalize text-md text-neutral-content'>
                                {company}
                            </h4>

                            {/* COLOR */}
                        </div>

                        <p className='font-medium ml-0 sm:ml-auto text-lg'>
                            {dollarsAmount}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductList;