// Home button

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PowerBtn } from '../components/AllSvgs'


const Power = styled.button`
position: fixed;
top: 2rem;
left: 50%;
transform: translate(-50%, 0);
color:#778eef;
background-color: #FCF6F4;
padding: 0.3rem;
border-radius: 50%;
border: 1px solid #778eef;
width: 2.5rem;
height: 2.5rem;

display: flex;
justify-content: center;
align-items:center;
z-index:3;

cursor: pointer;

&:hover{
    color:white;
    background-color:#778eef;
    border-radius: 50%;
border: 1px solid white;
    height:2.8rem;
    width:2.8rem;
}

&>*:first-child{
    text-decoration: none;
    color: inherit;
}
`


const PowerButton = () => {
    return (
        <Power>
        <NavLink to="/">
        <PowerBtn width={30} height={30} fill='currentColor' />
        </NavLink>
        </Power>
    )
}

export default PowerButton
