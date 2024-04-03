//This code is a React component called ProductsGrid responsible for rendering a grid of products. It utilizes the React Router Link component and the useLoaderData hook, presumably from a server-rendering environment, to fetch product data.

import { Link, useLoaderData } from 'react-router-dom';
//Link is used to create links to different pages in the application. useLoaderData is used to access data loaded during server-side rendering.
import { formatPrice } from '../utils';


const ProductsGrid = () => {

    const { products } = useLoaderData();
    //The useLoaderData hook is typically used in React Router applications that use server-side rendering (SSR) or data preloading strategies. It's a part of React Router's data loading strategy for SSR, where data is pre-fetched on the server and passed to the client to avoid the delay of loading data on the client side after rendering.

    //Destructuring assignment allows extracting values from objects or arrays and assigning them to variables in a more concise way. In this case, it's used to extract the products property from the object returned by the useLoaderData hook.

    return (
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>

            {products.map((product) => {
                {/*This line uses the map() function on the products array. The map() function is a built-in JavaScript array method used to iterate over each item in an array and transform it according to a specified transformation function. */ }
                const { title, price, image } = product.attributes;
                {/*Within the arrow function, destructuring assignment is used to extract specific properties (title, price, image) from the attributes object of each product. */ }
                const dollarsAmount = formatPrice(price);
                {/*After extracting the `price` property from the  `product.attributes`
                 formatPrice is utility function imported from `../utils->index.js */}
                return (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className='card w-full  shadow-xl hover:shadow-2xl transition duration-300 '
                    >
                        <figure className='px-4 pt-4'>
                            <img
                                src={image}
                                alt={title}
                                className='rounded-xl h-64 md:h-48 w-full object-cover'
                            />
                        </figure>
                        <div className='card-body items-center text-center'>
                            <h2 className='card-title capitalize tracking-wider'>{title}</h2>
                            <span className='text-secondary'>{dollarsAmount}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
export default ProductsGrid;