import React,  { useState , useEffect } from 'react';

import { Container } from './styles';

const scrollThreshold =  300;

declare global {
  interface Window {
    toggleActiveMenu: (() => void) | undefined;
  }
}

const SiderMenu: React.FC = ({ children }) => {
 
  const [ scrollY, setScrolY] = useState(0);
  const [ IsActive, SetIsActive ] = useState(true);

  useEffect(() => {
    
    function onScroll(){
      setScrolY(window.scrollY);
      SetIsActive(false);
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);

  }, []);

  const classes = [
    IsActive ? 'open' : '',
    scrollY <= scrollThreshold ? 'scrollOpen' : '',
  ];

  const className = classes.join('').trim();

  function toggleActiveMenu() {
    SetIsActive(prev => !prev);
  }

  window.toggleActiveMenu = toggleActiveMenu;

  return <Container className={className}>{children}</Container>
}

export default SiderMenu;