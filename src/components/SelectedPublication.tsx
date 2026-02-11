import { Divider } from "antd"
import { paperList } from "../assets/info.ts"
import { PAPER } from '../typings/types'
import Paper from "./Paper.tsx"
import { useEffect, useState } from "react"

function SelectedPublication () {
  const [screen, setScreen] = useState(window.innerWidth)

  const themes = {
    'Visual Analytics for Decision Making': [
      "TraSculptor: Visual Analytics for Enhanced Decision-Making in Road Traffic Planning",
      "DrainScope: Visual Analytics of Urban Drainage System",
      "StressDiffVis: Visual Analytics for Multi-Model Stress Comparison"
    ],
    'Large Scale Spatiotemporal Data Visualization': [
      "Visualizing Large-Scale Spatial Time Series with GeoChron",
      "Volume-Based Space-Time Cube for Large-Scale Continuous Spatial Time Series",
    ],
    // 'Interpretable Visual Analytics at Scale': [
    //   "RouteFlow: Trajectory-Aware Animated Transitions",
    //   "Does This Have a Particular Meaning? Interactive Pattern Explanation for Network Visualizations",
    // ],
    // "Data-driven Arts": [
    //   "Loss of Sonnet 18",
    //   "Pieces of Peace: Women and Gender in Peace Agreements"
    // ],
  }

  useEffect(() => {
      const handleResize = () => {
        setScreen(window.innerWidth)
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  
    }, []);

  return (
    <div id="selected-publication">
      <Divider />
      <div className="sec-title" style={{ marginBottom: 20 }}>
        <span className="bg-hl">Research Highlights</span>
        <span style={{fontSize: 18, fontWeight: 200, marginLeft: 5}}>
          (<a 
            href={screen > 660 ? "https://zkrain.github.io/#publication" : "https://zkrain.github.io/#publication-list"}
            style={{textDecoration: 'underline'}}>
              Full list
          </a>)
        </span>
      </div>
      <div className="paper-list">
        {Object.keys(themes).map((theme: string) => (
          <div style={{
            marginBottom: 22,
          }}>
            <span style={{ 
                fontWeight: 600 , 
                fontSize: 18,
            }}>
              {theme}
            </span>
            {themes[theme as keyof typeof themes].map((title: string, index: number) => {
              const paper = paperList.filter((p: PAPER) => p.title === title)[0]
              return (
                <>
                  <Paper
                    key={paper.title}
                    selected={paper}
                  />
                  {index < themes[theme as keyof typeof themes].length - 1 && <Divider style={{ margin: '6px 0' }} />}
                </>
              )
            })}
          </div>
        ))}
      </div>
  </div>
  )
}

export default SelectedPublication