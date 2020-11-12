import React from 'react';

// import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo-code7.svg';

const Header: React.FC = () => (
  <Container>
    <header>
      <img src={Logo} alt="desafioCode7" />
    </header>
  </Container>
);

export default Header;
