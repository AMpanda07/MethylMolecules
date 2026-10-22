import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

/**
 * Main application layout with sticky header, scrollable content, and sticky footer.
 */
export const MainLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
