//using the createSlice function provided by Redux Toolkit. It manages the state related to a shopping cart in an e-commerce application. 
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


//defaultState defines the initial state of the shopping cart slice. It includes properties such as cartItems (an array of items in the cart), numItemsInCart (the total number of items in the cart), cartTotal (the total price of items in the cart), shipping (the shipping cost), tax (the tax amount), and orderTotal (the total cost of the order including tax and shipping).
const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
};

//getCartFromLocalStorage is a function that retrieves the shopping cart state from the local storage. If there's no cart state stored, it returns the default state.

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),


    //The reducers define how the state should be updated in response to actions.
    reducers: {
        //The state argument represents the current state of the shopping cart, and the action argument contains information about the action that was dispatched to trigger this reducer.
        addItem: (state, action) => {

            //The action.payload contains the data sent along with the action. In this case, it's expected to contain a product object, which represents the item being added to the cart.
            const { product } = action.payload;

            //Here, the code checks if the product being added to the cart already exists in the cart. It does this by searching through the cartItems array in the state to find an item with a matching cartID.
            const item = state.cartItems.find((i) => i.cartID === product.cartID);

            if (item) {
                item.amount += product.amount;
            } else {
                state.cartItems.push(product);
            }
            state.numItemsInCart += product.amount;
            state.cartTotal += product.price * product.amount;
            //This line invokes the calculateTotals reducer, which recalculates the tax and order total based on the updated cart information. It's done using the caseReducers property provided by Redux Toolkit to access other reducers within the same slice.
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Item added to cart');
        },
        clearCart: (state) => {
            localStorage.setItem('cart', JSON.stringify(defaultState));
            return defaultState;
        },

        removeItem: (state, action) => {
            const { cartID } = action.payload;

            //Here, the code retrieves the product to be removed from the cart by searching through the cartItems array in the state to find an item with a matching cartID.
            const product = state.cartItems.find((i) => i.cartID === cartID);

            //The code removes the item with the specified cartID from the cartItems array using the filter method. It keeps only the items whose cartID does not match the specified cartID, effectively removing the item from the cart.
            state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

            state.numItemsInCart -= product.amount;
            state.cartTotal -= product.price * product.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Item removed from cart');
        },
        editItem: (state, action) => {
            const { cartID, amount } = action.payload;

            //This line finds the item to be edited from the cart by searching through the cartItems array in the state to find an item with a matching cartID.
            const item = state.cartItems.find((i) => i.cartID === cartID);

            state.numItemsInCart += amount - item.amount;
            state.cartTotal += item.price * (amount - item.amount);
            item.amount = amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Cart updated');
        },
        //The calculateTotals reducer function calculates the tax and order total based on the current state of the shopping cart.
        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            //reducer updates the local storage to persist the updated cart state. It does this by converting the state object to a JSON string using JSON.stringify and setting it as the value for the 'cart' key in the local storage.
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

//These exported actions can be dispatched elsewhere in the application to trigger the respective reducers defined in the cartSlice.
export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


//The reducer function is responsible for handling state transitions in response to dispatched actions.
//When an action is dispatched, the Redux store passes the current state and the action to the reducer. The reducer then determines how the state should be updated based on the action type and payload.

// these lines of code export both the actions and the reducer generated by the createSlice function, making them available for use in other parts of the application where they can be dispatched and integrated into the Redux store.






