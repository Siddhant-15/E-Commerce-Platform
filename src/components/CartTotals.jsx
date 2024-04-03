//responsible for displaying the total costs associated with items in a shopping cart.
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils';


const CartTotals = () => {

    // useSelector extracts the cartTotal, shipping, tax, and orderTotal properties from the cartState slice of the Redux store's state.
    const { cartTotal, shipping, tax, orderTotal } = useSelector(
        (state) => state.cartState
    );

    return (
        <div className='card bg-base-200'>
            <div className='card-body'>
                {/* SUBTOTAL */}
                <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Subtotal</span>
                    <span className='font-medium'>{formatPrice(cartTotal)}</span>
                </p>
                {/* SHIPPING */}
                <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Shipping</span>
                    <span className='font-medium'>{formatPrice(shipping)}</span>
                </p>
                {/* Tax */}
                <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Tax</span>
                    <span className='font-medium'>{formatPrice(tax)}</span>
                </p>
                {/* Total */}
                <p className='mt-4 flex justify-between text-sm  pb-2'>
                    <span className='font-bold'>Order Total</span>
                    <span className='font-bold'>{formatPrice(orderTotal)}</span>
                </p>
            </div>
        </div>
    );
};
export default CartTotals;

