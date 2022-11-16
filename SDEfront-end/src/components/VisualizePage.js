import React, { useEffect, useRef } from 'react'
import { Route, Switch, useLocation } from "react-router"
import styled, { ThemeProvider } from 'styled-components'
import {DarkTheme, lightTheme} from './Themes';
import {motion} from 'framer-motion';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';

import { Categories } from "../data/CategoryData";
import Card from '../subComponents/Card';
import { YinYang } from './AllSvgs';
import BigTitlte from '../subComponents/BigTitlte';

const Box = styled.div`
background-color: ${props => props.theme.body};

height:300vh;
position: relative;
display: flex;
align-items: center;


`

const Main = styled(motion.ul)`
position: fixed;
top: 12rem;
left:calc(10rem + 15vw);
height: 40vh;
display: flex;

color:white;
`
const Rotate = styled.span`
display:block;
position: fixed;
right:1rem;
bottom: 1rem;
width: 80px;
height: 80px;
z-index:1;
`


// Framer-motion Configuration
const container = {

  hidden: {opacity:0},
  show: {
    opacity:1,

    transition:{
      staggerChildren: 0.5,
      duration: 0.5,
    }
  }

}

const DarkDiv = styled.div`
  position: absolute;
  top: 0;
  background-color: ${(props) => props.theme.text};;
  bottom: 0;
  right: 50%;
  width: ${(props) => (props.click ? "50%" : "0%")};
  height: ${(props) => (props.click ? "100%" : "0%")};
  z-index: 1;
  transition: height 0.5s ease, width 1s ease 0.5s;
`;



const VisualizePage = () => {

    const ref = useRef(null);
    const yinyang = useRef(null);



    useEffect(() => {
        let element = ref.current;
       
        
        const rotate = () => {
         
         element.style.transform = `translateX(${-window.pageYOffset}px)`
      
         
          // return (yinyang.current.style.transform =
          //   'rotate(' + -window.pageYOffset + 'deg)')
        }
    
        window.addEventListener('scroll', rotate)
        return () => {
          window.removeEventListener('scroll', rotate);
          
        }
      }, [])


    return (
        <ThemeProvider theme={lightTheme}>
<Box>

<LogoComponent theme='dark'/>
{/* <SocialIcons theme='dark'/> */}
{/* <DarkDiv click={console.log('dark div')} /> */}
<PowerButton />

     <Main ref={ref}   variants={container} initial='hidden' animate='show'  >
         {
            Categories.map( d => 
            <Card key={d.id} data={d} />
            )
         }
     </Main>
<Rotate ref={yinyang}>
    <YinYang width={80} height={80} fill={DarkTheme.text} />
</Rotate>

<BigTitlte text="Visualize" top='10%' right="20%" />
        </Box>

        </ThemeProvider>
        
    )
}

export default VisualizePage
