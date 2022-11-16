import React, { useContext } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import Me from '../assets/Images/profile-img3.png';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import App from './VisualizeBarchart';
import Analyze from './Analyzeapp';
import { DarkTheme, lightTheme } from './Themes';
import Reviews from '../data/reviews';
import { dataContext, updateDataContext } from '../App';

// use cors


const Main = styled.div`
  border: 2px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
 backdrop-filter: blur(4px);
  
  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;
`;

const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`;
const Spaceman = styled.div`
position: absolute;
top: 10%;
right: 5%;
width: 20vw;
animation: ${float} 4s ease infinite;
img{
    width: 100%;
    height: auto;
}
`;

const Box2 = styled.div`
background-color: ${props => props.theme.body};
width: 70vw;
height:100vh;
position: relative;
overflow: hidden;
`;

const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 65vw;
  height: 55vh;
  display: flex;

  background: linear-gradient(
        to right,
        ${props => props.theme.body} 50%,
        ${props => props.theme.text} 50%
      )
      bottom,
    linear-gradient(
        to right,
        ${props => props.theme.body} 50%,
        ${props => props.theme.text} 50%
      )
      top;
  background-repeat: no-repeat;
  background-size: 100% 2px;
  border-left: 2px solid ${props => props.theme.body};
  border-right: 2px solid ${props => props.theme.text};

  z-index: 1;
`;
const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;

  .pic {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
    height: auto;
  }

  Button {
    border-radius:0.5rem;
    border: 0.01rem solid #778eef;
    font-size:2rem;
    padding:0.5rem;
    color: #778eef;
    background-color:white;
  }

  Button:hover {
    border-radius:0.5rem;
    background-color:#778eef;
    color: white;
    border: 0.01rem solid white;
    cursor:pointer; 
  }
`;

const Text = styled.div`
  font-size: calc(1em + 1.5vw);
  color: ${props => props.theme.body};
  padding: 2rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > *:last-child {
    color: ${props => `rgba(${props.theme.bodyRgba},0.8)`};
    font-size: calc(0.1rem + 1.3vw);
    font-weight: 200;
  }
`;

function getReviews(){
  const arr = [];
  const len = Reviews.length;
  for(var i=0; i<10; i++){
    var ind = Math.random()*1e9;
    ind=ind%len;
    ind = Math.floor(ind);
    arr.push(Reviews[ind].body);
  }
  return arr;
}

const Intro = () => {
  // create handleclose function
  const [show, setShow] = React.useState(false);
  const [analyze, setAnalyze] = React.useState(false);
  const [obj, setObj] = React.useState({});
  const [arr, setArr] = React.useState([]);

  const handleClose = link => {
    const data2 = getReviews();
    console.log(data);
    const appId = link;
    // var axios = require('axios');
var data = JSON.stringify({
  "app_id": appId,
  "queries": data2,
});

// var config = {
//   method: 'post',
//   url: 'http://ec2-15-206-89-221.ap-south-1.compute.amazonaws.com/api/',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
    
    const io = require('socket.io-client');
    const socket = io.connect('http://15.206.89.221');

    socket.on('connect', () => {
      console.log('Successfully connected!');
    });

    socket.emit('join',appId);

    socket.on('message',(response)=>{
      console.log(response);
        console.log(response.result[0]);
        const recieved = response.result[0];
        var newArray = [];
        for(var i=0; i<predictedData.length; i++){
          newArray.push(predictedData[i]);
        }
        newArray.push(recieved);
        updatePredictedData(newArray);
    });
    var config = {
      method: 'post',
      url: 'http://ec2-15-206-89-221.ap-south-1.compute.amazonaws.com/api/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
})
    .catch(function (error) {
      console.log(error);
    });

  };

  const formsubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log('hmm', formDataObj);
    // updatePredictedData('hello');
    handleClose(formDataObj.link);
  };
  const handleShow = () => setShow(true);

  const predictedResponse = [{
    "app_id": "keshav_app_id",
    "transcation_id": "e0996e12-01b6-43b0-bb06-cdcb5c88b42d",
    "query": "please put an option for enligh movies that are dubbed in Malayalam,It's very hard to sort out.",
    "result": [
        {
            "action": 8.87781279587071,
            "problem": 6.0203907121898785,
            "neither": 85.10179649193941
        }
    ]
},
{
  "app_id": "keshav_app_id",
  "transcation_id": "e0996e12-01b6-43b0-bb06-cdcb5c88b42d",
  "query": "please put an option for enligh movies that are dubbed in Malayalam,It's very hard to sort out.",
  "result": [
      {
          "action": 8.87781279587071,
          "problem": 6.0203907121898785,
          "neither": 85.10179649193941
      }
  ]
}];


const predictedData = useContext(dataContext);
const updatePredictedData = useContext(updateDataContext);

  return (
    // if analyze is true, then show analyze page
    <Box
        initial={{ height: 0 }}
        animate={{ height: '55vh' }}
        transition={{ type: 'spring', duration: 2, delay: 1 }}
      >
        <SubBox>
          {/* create a input text field*/}
          {(predictedData.length===0)?
          <Text>
            <Modal.Body>
              <Form onSubmit={formsubmit}>

                <Form.Group className="mb-3" controlId="ControlTextarea1">
                  <h4>
                    Paste your app Id here to get results
                  </h4>
                  <Form.Control type="text" name="link" />
                </Form.Group>
                <br />
                <Button variant="outline-dark" type="submit" row={3}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer />
          </Text> : 
          <Text>
            <Modal.Body>
              Click visulaize on left to visulaize data with graphs
              <br></br>
              Click Reviews on right to see fetched reviews
              <br></br><br></br>
              <Button variant="outline-dark" onClick={()=>{updatePredictedData([])}}  row={3}>
                  Search 
                </Button>
            </Modal.Body>
            <Modal.Footer />
          </Text>}
        </SubBox>
        <SubBox>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <img className="pic" src={Me} alt="Profile Pic" />
          </motion.div>
        </SubBox>
      </Box>
  );
};

export default Intro;
