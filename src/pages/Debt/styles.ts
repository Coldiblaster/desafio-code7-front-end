import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  cardExist: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap; // Quebra a linha
  flex-direction: row;
  align-items: stretch;
  padding: 35px;
`;

export const ContentDebts = styled.div<CardProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 300px;
  height: 80vh;

  @media screen and (max-width: 592px) {
    max-width: 100%;
    height: 67vh;
    align-items: center;
    justify-content: center;
  }

  ${props =>
    !props.cardExist &&
    css`
      display: none;
    `}
`;

export const CardContainer = styled.section`
  width: 90%;
  overflow-y: scroll;
  background: #fff;
  border-radius: 12px;

  @media screen and (max-width: 592px) {
    width: 94%;
  }

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
  flex: 1;
  height: 100%;
  margin-top: -15px;

  @media screen and (max-width: 592px) {
    margin-top: 25px;
  }

  form {
    background: #fffcfc;
    border-radius: 12px;
    margin: 15px 10px;
    text-align: center;
    padding: 15px;

    h1 {
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      margin-top: 30px;
    }
  }
`;
