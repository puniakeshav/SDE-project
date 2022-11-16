import { useState, createContext, useContext } from "react";
import { Route, Switch, useLocation } from "react-router"
import { ThemeProvider } from "styled-components"
import { lightTheme } from "./components/Themes"

import GlobalStyle from "./globalStyles"


//Components
import Main from './components/Main';
import AboutPage from './components/AboutPage';
import FactPage from './components/FactPage';
import VisualizePage from './components/VisualizePage';
import AboutUs from './components/AboutUs';
import VisualizeBarchart from "./components/VisualizeBarchart";
import VisualizeRadarchart from "./components/VisualizeRadarchart";
import VisualizePiechart from "./components/VisualizePiechart"
import VisualizePolarchart from "./components/VisualizePolarchart";
import VisualizeDoughnut from "./components/VisualizeDoughnutchart";
import VisualizeLinechart from "./components/VisualizeLinechart";
import Analyzeapp from "./components/Analyzeapp";
import Communication from "./components/Communication";
import { AnimatePresence } from "framer-motion";
import SoundBar from "./subComponents/SoundBar";
import Intro from "./components/Intro";

export const dataContext = createContext();
export const updateDataContext = createContext();

function App() {
  const [predictedData, setPredictedData] = useState([]);
  const [cnt,setcnt] = useState(0);
  const location = useLocation();

  function updatePredictedData(newData){
    console.log('state updated....',predictedData, newData);
    setPredictedData(newData);
  }
  return <>

<dataContext.Provider value={predictedData}>
<updateDataContext.Provider value={updatePredictedData}>
  <GlobalStyle />

    <ThemeProvider theme={lightTheme}>

    {/* <SoundBar /> */}

{/* For framer-motion animation on page change! */}
<AnimatePresence exitBeforeEnter>
<Switch  location={location} key={location.pathname}>
      <Route exact path="/" component={Main}/>
      <Route exact path="/about" component={AboutPage}/>
      <Route exact path="/fact" component={FactPage}/>
      <Route exact path="/visualize" component={VisualizePage}/>
      <Route exact path="/aboutus" component={AboutUs}/>
      <Route exact path="/visualizebarchart" component={VisualizeBarchart}/>
      <Route exact path="/radarchart" component={VisualizeRadarchart}/>
      <Route exact path="/piechart" component={VisualizePiechart}/>
      <Route exact path="/doughnut" component={VisualizeDoughnut}/>
      <Route exact path="/polarchart" component={VisualizePolarchart}/>
      {/* <Route exact path="/linechart" component={VisualizeLinechart}/>  */}
      <Route exact path="/analyze" component={Analyzeapp}/>
     
      


    </Switch>
</AnimatePresence>
    
    
    </ThemeProvider>
    </updateDataContext.Provider>
    </dataContext.Provider>
    
    </>
    
}

export default App

