//renders a shopping cart page. It utilizes React Redux for state management and react-router-dom for routing.
import { useSelector } from 'react-redux';
import { CartItemsList, SectionTitle, CartTotals } from '../components';
import { Link } from 'react-router-dom';

const Cart = () => {
    // temp
    const { user } = useSelector((state) => state.userState);//Extracts the user object from the userState slice of the Redux store.
    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
    if (numItemsInCart === 0) {
        return <SectionTitle text='Your cart is empty' />;
    }


    //Render Cart Items and Totals
    return (
        <>
            <SectionTitle text='Shopping Cart' />
            <div className='mt-8 grid gap-8  lg:grid-cols-12'>
                <div className='lg:col-span-8'>
                    <CartItemsList />
                </div>
                <div className='lg:col-span-4 lg:pl-4'>
                    <CartTotals />

                    {/*Conditional Navigation Buttons*/}
                    {user ? (
                        <Link to='/checkout' className='btn btn-primary btn-block mt-8'>
                            Proceed to checkout
                        </Link>
                    ) : (
                        <Link to='/login' className='btn btn-primary btn-block mt-8'>
                            please login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};
export default Cart;