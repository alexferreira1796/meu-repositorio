import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const animaLoading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  > svg { 
    animation: ${animaLoading} 2s linear infinite;
  }
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  > img {
    width: 150px;
    border-radius: 20%;
    margin: 20px auto;
  }
  > h1 {
    font-size: 30px;
    color: #0D2636;
  }
  > p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  > li {
    display: flex;
    padding: 15px 10px;
    flex-wrap: wrap;
    & + li {
      margin-top: 12px;
    }
    > img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0D2636; 
    }
    > div {
      flex: 1;
      margin-left: 12px;
      > strong {
        font-size: 15px;
        display: flex;
        flex-wrap: wrap;
        > a {
          color: #222;
          transition: 0.3s;
          &:hover {
            color: #0071db;
          }
        }
        > span {
          background-color: #222;
          color: #fff;
          font-size:12px;
          border-radius: 4px;
          padding: 4px 7px;
          font-weight: 600;
          margin-left: 10px;
        }
      }
      > p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > button {
    outline: 0;;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &::last-child() {
      align-self: end;
    }

  }
`;

export const Selects = styled.div`
  margin-top: 10px;
`;