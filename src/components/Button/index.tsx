import React from 'react';

import { Buttons } from './style';
 
interface IButtonProps {
  options: {
    name: string;
    value: string;
  }[];
  onClick(param: string): void;
  active: string;
}

const Button: React.FC<IButtonProps> = ({options, onClick, active}) => {
  return (
    <Buttons>
      {
        options.map(({name, value}: {name: string, value: string}) => {
          return ( <button className={active === value ? 'active' : ''} key={name} value={value} onClick={() => onClick(value)}>{name}</button>)
        })
      }
    </Buttons>
  );
}

export default Button;