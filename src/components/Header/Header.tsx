import { useWeb3React } from '@web3-react/core';
import React from 'react'
import styled from 'styled-components'
import useAuth from '../../hooks/useAuth'

const Header = (props: any) => {
  const {login} = useAuth();
  const {account} = useWeb3React();
 
  return (<HeaderContainer>
    <div>
      <NavLink onClick={() => props.showAccountGallary(0)}>All</NavLink>
      <NavLink onClick={() => props.showAccountGallary(1)}>Mine</NavLink>
      <NavLink onClick={() => props.showAccountGallary(2)}>Market</NavLink>
    </div>
    <div>
      {account}
      <NavLink onClick={() => login()}>Wallet</NavLink>
    </div>
  </HeaderContainer>);
}

const HeaderContainer = styled.div`
  user-select: none;
  width: 100%;
  height: 60px;
  background-color: #2e82ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  color: white;
  font-size: 20px;
`

const NavLink = styled.a`
  cursor: pointer;
  padding: 0 20px;
  line-height: 60px;
  :hover {
    background-color: rgba(255, 255, 255, .2);
  }
`
export default Header;