import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
  background: #202583;
  padding: 15px;
`;

export const ContentDebts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 89vh;
  max-width: 300px;
`;

export const CardContainer = styled.section`
  width: 90%;
  overflow-y: scroll;
  background: #fff;
  border-radius: 12px;

  ::-webkit-scrollbar {
    width: 10px;
    background: white;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #151a4e;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #5d5d69;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Card = styled.div`
  width: 90%;
  background: #e05353;
  padding: 22px 32px;
  border-radius: 5px;
  margin: 10px auto;
  color: #fff;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 14px;
      color: #fff;
    }
  }

  h2 {
    color: #fff;
  }

  svg {
    cursor: pointer;

    :hover {
      color: ${shade(0.3, '#e05353')};
    }
  }
`;

export const ContentForm = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-content: flex-start; */
  flex: 1;
  height: 100%;
  margin-bottom: 85px;
  border-radius: 12px;

  background: #fffcfc;

  form {
    margin: 15px 10px;
    text-align: center;

    h1 {
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      margin-top: 30px;
    }
  }
`;

export const ContentCreate = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-end;
  background: red;
`;
