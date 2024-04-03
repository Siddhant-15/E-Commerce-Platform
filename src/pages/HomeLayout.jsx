import { Outlet, useNavigation } from 'react-router-dom';//Outlet is a component used in nested routing to render child components based on the current route
//useNavigation is a hook that provides access to the navigation state and methods.
import { Navbar, Loading, Header } from '../components';
const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <>
            <Header />
            <Navbar />
            {isPageLoading ? (
                <Loading />
            ) : (
                <section className='align-element py-20'>
                    <Outlet />
                </section>
            )}
        </>
    );
};
export default HomeLayout;