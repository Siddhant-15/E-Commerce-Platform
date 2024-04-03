// this code sets up a Redux slice for managing user-related state such as authentication and theme selection. It provides actions for logging in, logging out, and toggling themes, along with reducer functions to handle these actions and update the state accordingly.
import { createSlice } from '@reduxjs/toolkit';//It is used to create a Redux slice.
import { toast } from 'react-toastify';//It is used to display toast notifications.

const themes = {// themes object contains key-value pairs
    winter: 'winter',
    dracula: 'dracula',
};

const getUserFromLocalStorage = () => {//retrieves user data from the browser's local storage
    return JSON.parse(localStorage.getItem('user')) || null;

    //localStorage.getItem('user'): This line accesses the localStorage object, a storage mechanism available in modern web browsers that allows websites to store data locally within the user's browser. It retrieves the value associated with the key 'user' from the local storage.
    //JSON.parse(...): The retrieved value from local storage is typically a string. Since localStorage stores data as strings, we use JSON.parse to parse the string and convert it into a JavaScript object.
};

const getThemeFromLocalStorage = () => {//retrieves the theme preference from the browser's local storage
    const theme = localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
}

const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({//a new slice of the Redux state is being created using the createSlice function from Redux Toolkit.
    name: 'user',//sets the name of the slice to 'user'
    initialState,// initial state of the slice
    reducers: {//specify how the state changes in response to actions
        loginUser: (state, action) => {
            const user = { ...action.payload.user, token: action.payload.jwt };//creates a new user object by spreading the user object from the payload and adding a token property to it.
            state.user = user;//updates the user property in the slice's state with the new user object.
            localStorage.setItem('user', JSON.stringify(user));//saves the user object to the browser's local storage as a string.
        },
        logoutUser: (state) => {
            state.user = null;
            // localStorage.clear()
            localStorage.removeItem('user');//removes the user item from local storage.
            toast.success('Logged out successfully');
        },
        toggleTheme: (state) => {//toggles between two themes: 'dracula' and 'winter'
            const { dracula, winter } = themes;
            state.theme = state.theme === dracula ? winter : dracula;
            document.documentElement.setAttribute('data-theme', state.theme);//sets a custom HTML attribute (data-theme) on the documentElement to the current theme, allowing you to apply styles based on the theme.
            localStorage.setItem('theme', state.theme);//saves the current theme to local storage.
        },
    },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;//These action creators (loginUser, logoutUser, toggleTheme) can be used to dispatch the corresponding actions in your components.

export default userSlice.reducer;//exports the reducer function created by createSlice, which can be used with configureStore to create the Redux store.