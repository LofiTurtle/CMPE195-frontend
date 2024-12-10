import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styled from 'styled-components';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
 
`;

const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 50px); /* Subtract navbar height */
 
`;

const SidebarWrapper = styled.div`
  width: 240px;
  background-color: var(--secondary-bg);
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 240px; /* Width of sidebar */
  padding: 20px;
  background-color: #f0f2f5; 
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentContainer = styled.div`
  max-width: full;
  margin: 0 auto;
  width: 100%;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const NavbarWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppLayout>
      <NavbarContainer>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </NavbarContainer>
      
      <MainContent>
        <SidebarWrapper>
          {/* Sidebar content */}
        </SidebarWrapper>
        
        <ContentWrapper>
          <ContentContainer>
            <Outlet />
          </ContentContainer>
        </ContentWrapper>
      </MainContent>
    </AppLayout>
  );
};

export default NavbarWrapper;