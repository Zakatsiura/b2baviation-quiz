
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '../components';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export { MainLayout };