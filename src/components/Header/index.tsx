import React from 'react';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

import Logo from '../../assets/logo-code7.svg';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <header>
        <img src={Logo} alt="desafioCode7" />
        <nav>
          <button type="button" onClick={() => signOut()}>
            Logout
          </button>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
