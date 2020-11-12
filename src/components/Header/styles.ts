import styled from 'styled-components';

export const Container = styled.div`
  background: #151a4e;
  height: 11vh;
  display: flex;

  button {
    padding: 5px;
    border-radius: 5px;
    background: #fff;

    :hover {
      background: #e05353;
    }
  }

  header {
    width: 100%;
    margin: 0 auto;
    padding: 0 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        & + a {
          margin-left: 32px;
        }
        &:hover {
          opacity: 0.6;
        }
      }
    }

    @media screen and (max-width: 592px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
