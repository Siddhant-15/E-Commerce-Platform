import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';//custom utility function for making HTTP requests.
const url = '/products';//points to an API endpoint that retrieves a list of products.

export const loader = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await customFetch(url, { params });

    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
};


const Products = () => {
    return (
        <>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
        </>
    );
};
export default Products;