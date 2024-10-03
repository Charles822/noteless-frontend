import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidenav from './Sidenav';

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="fixed w-full top-0 z-10 border-r bg-white">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="fixed flex-shrink-0">
            <Sidenav />
          </div>
          <div className="py-14 pl-14">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
