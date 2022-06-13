import { useWeb3React } from '@web3-react/core';
import React from 'react'
import styled from 'styled-components'
import useAuth from '../../hooks/useAuth'

const Header = (props: any) => {
  const {login} = useAuth();
  const {account} = useWeb3React();
 
  return (<HeaderContainer>
    <div>
      <NavLink active={props.showMode === 0} onClick={() => props.showAccountGallary(0)}>All</NavLink>
      <NavLink active={props.showMode === 1} onClick={() => props.showAccountGallary(1)}>Mine</NavLink>
      <NavLink active={props.showMode === 2} onClick={() => props.showAccountGallary(2)}>Market</NavLink>
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

const NavLink = styled.a<any>`
  cursor: pointer;
  padding: 0 20px;
  line-height: 60px;
  background-color: ${(props) => props.active ? 'rgba(255, 255, 255, .2)' : ''};
  :hover {
    background-color: rgba(255, 255, 255, .2);
  }
`
export default Header;