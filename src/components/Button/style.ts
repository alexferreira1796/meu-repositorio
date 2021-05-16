import styled from 'styled-components';

export const Buttons = styled.div`
  > button {
    background: #eee;
    outline: 0;
    border: 1px solid #c2c2c2;
    padding: 5px 7px;

    & + button {
      margin-left: 5px;
    }
  }
  .active {
    background: #0071db;
    color: #fff;
  }
`;