import React from 'react';
import logo from '../images/logo.svg'
export const  Header = () => {
  return (
    <>
      <header className="header root__section">
          <img src={logo} alt="mesto logo" className="logo"/>
      </header>
    </>
  )
}