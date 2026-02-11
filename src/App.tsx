import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import News from './components/News'
import About from './components/About'
import Resume from './components/Resume'
import Prospectives from './components/Prospectives'
import SelectedPublication from './components/SelectedPublication'
import Publication from './components/Publication'
import PublicationList from './components/PublicationList'

function App() {
  const currentUrl = window.location.href
  const initComp = () => {
    if (currentUrl.endsWith('/#cv') || currentUrl.endsWith('/#teaching') || currentUrl.endsWith('/#talks') || currentUrl.endsWith('/#service')) {
      return 'cv'
    }
    else if (currentUrl.endsWith('/#prospectives')) {
      return 'prospectives'
    }
    else if (currentUrl.endsWith('/#publication')) {
      return 'publication'
    }
    else if (currentUrl.endsWith('/#publication-list')) {
      return 'publication-list'
    }
    // else if (currentUrl.endsWith('/#test')) {
    //   return 'test'
    // }
    return 'home'
  }
  const [comp, setComp] = useState<string>(initComp)

  return (
    <>
      <div id="header">
        <div className="first"></div>
        <div className="second"></div>
        <Nav setComp={setComp}/>
      </div>
      {comp === 'publication' 
        ? <Publication /> 
        : <div id="main">
          {comp === 'home' ?
            <Home /> :
            comp === 'prospectives' ?
              <Prospectives /> : 
              comp === 'publication-list' ?
                <PublicationList /> : <Resume />}
          </div >}
      <div id="footer">
        Copyright @ Xinhuan Shu. PivotPaths from <a style={{ color: 'rgba(0, 0, 0, 0.5)'}} target='_blank' href="https://mariandoerk.de/">@Marian Dörk</a>.
        <br />
        Last updated: { new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }.
      </div>
    </>
  )
}

export default App


function Home() {
  return (
    <>
      <About />
      <News />
      <SelectedPublication />
    </>
  )
}
