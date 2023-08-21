import { Routes, Route } from 'react-router-dom';

import './App.css';
import { MainLayout } from '../src/layouts/MainLayout';
import { AviationSecurity } from './pages/AviationSecurity';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<AviationSecurity />} />
            </Route>
        </Routes>
    );
}
export default App;
