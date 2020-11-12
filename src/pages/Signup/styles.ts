import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const ContentSignUp = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  background: #a9aaae;
  padding: 3% 5%;
`;
