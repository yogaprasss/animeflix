import TopBar from './TopBar';

import type { ContainerProps } from '@/models/global';

const MainLayout = ({ children }: ContainerProps) => {
  return (
    <>
      <nav>
        <TopBar />
      </nav>
      <main className='content'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;