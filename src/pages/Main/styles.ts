import styled, { keyframes, css } from 'styled-components';

interface IButtonProps {
  type?: string;
  loading?: number;
}

interface IDeleteProps {
  type?: string;
}

interface IFormProps {
  error: string;
}

export const Container = styled.main`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);

  > h1 {
    font-size: 20px;
    display: flex;
    align-items: center;

    > svg {
      margin-right: 10px;
    }
  }
  > h3 {
    margin-top: 30px;
  }
`;

export const Form = styled.form<IFormProps>`
  margin-top: 30px;
  display: flex;

  > input {
    flex: 1;
    border: 1px solid ${ props => props.error !== '' ? '#ff0000' : '#dddd' } ;
    padding: 10px 15px;
    border-radius: 4px 0px 0px 4px;
    font-size: 16px;
  }
`;

// Criando animacao do botao
const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
   transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs<IButtonProps>(props => ({
  type: 'submit',
  disabled: props.loading
}))<IButtonProps>`
  background-color: #0D2636;
  border: 0;
  border-radius: 0 4px 4px 0;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading && css`
    svg {
      animation: ${animate} 2s linear infinite;
    }
  `}

`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  > li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    > a {
      color: #0D2636;
    }

  }
`;

export const DeleteButton = styled.button.attrs<IDeleteProps>({
  type: 'button'
})<IDeleteProps>`
  margin-right: 6px;
  background-color: transparent; 
  color: #0D2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
  transition: .3s;
  &:hover {
    color: #ff0000;
  }
`;