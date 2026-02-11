import { Button, Divider } from 'antd'
import './News.css'
import { useEffect, useState } from 'react'

function News () {
  const [current, setCurrent] = useState(6)
  const [sum, setSum] = useState(0)

  
  /**
   * @description set display/hidden news
   * @param {number} cur
   * @param {number} count
   */
  const setAttr = (cur: number, count: number) => {
    const elements = document.getElementsByClassName('news')
    for (let idx = 0; idx < count; idx++) {
      const ele = elements[idx]
      if (idx < cur) {
        ele.setAttribute("class", 'news')
      }
      else {
        ele.setAttribute("class", 'news hidden')
      }
    }
  }

  const showMore = () => {
    let newCurrent = current + 3
    setCurrent(newCurrent)
    setAttr(newCurrent, sum)
  }

  const showLess = () => {
    setCurrent(6)
    setAttr(6, sum)
  }

  useEffect(() => {
    const newSum = document.getElementsByClassName('news').length
    setAttr(6, newSum)
    setSum(newSum)
  }, [sum])

  return (
    <div id='news'>
      <Divider />
      <div className="sec-title"><span className="bg-hl">News</span></div>
      <div className="content">
        <div className="news">
          <span className="time">Pinned 📌</span>
          <span className="item">I am actively seeking <b>motivated students</b> to join the group! See <a className="text-hl" href='https://zkrain.github.io/#prospectives'>working with me</a> for more information.
          </span>
        </div>
        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">Our paper <em>"Open-ended Structured Question Assessment with Human-LLM Collaboration"</em> got accepted by <b>CHI 2026</b>. Congratulations to Fengyan and all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">Our paper <em>"DensityBars: A Space-Efficient Visualization for Event Temporal Distribution"</em> got accepted by <b>CHI 2026</b>. Congratulations to Mingwei and all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">I will be honored to serve as a <a className="text-hl" href="https://ieeevis.org/year/2026/info/committees/program-committees/" target="_blank">full paper program committee member</a>👩‍⚖️ for IEEE VIS 2026.</span>
        </div>
        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">Our paper <em>"DrainScope: Visual Analytics of Urban Drainage System"</em> got accepted by <b>IEEE TVCG</b>. Congratulations to Mingwei and all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">Our paper <em>"Towards Understanding Time-Varying Spatial 3D Data Analysis with Animation and Small Multiples in Virtual Reality and Desktop"</em> got accepted by <b>IEEE VR</b>. Congratulations to all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">Our paper <em>"A Declarative Grammar for Interactive Trajectory Visualization: Interaction as First-Class Component"</em> got accepted by <b>PacificVis 2026</b>. Congratulations to Shifu and all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2026.01</span>
          <span className="item">I will be honored to serve as a program committee member for CCF CAD/CG 2026.</span>
        </div>

        <div className="news">
          <span className="time">2025.12</span>
          <span className="item">I give a talk about <em>Visual Analytics-based Human-AI Collaborative Decision Making</em> at Guangdong University of Technology, Guangzhou, China</span>
        </div>

        <div className="news">
          <span className="time">2025.12</span>
          <span className="item">Our paper <em>"Visual Knowledge-enhanced LLaVA for Fine-Grained Multimodal Named Entity Recognition and Grounding"</em> got accepted by <b>IEEE TASLP</b>. Congratulations to all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2025.11</span>
          <span className="item">I'm attending IEEE VIS 2025 in 📍Vienna, Austria. Open to grab a coffee and chat!</span>
        </div>

        <div className="news">
          <span className="time">2025.7</span>
          <span className="item">I give a talk about <em>From Visualization Research to Career: A Reflection</em> for ChinaVis at 📍Hangzhou, China.</span>
        </div>

        <div className="news">
          <span className="time">2025.11</span>
          <span className="item">Our paper <em>"Hybrid-DMMKG: A Hybrid Reasoning over Dynamic Multimodal Knowledge Graphs for Multimodal Multihop QA with Knowledge Editing"</em> got accepted by <b>AAAI 2026</b>. Congratulations to Li and all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2025.07</span>
          <span className="item">Our paper <em>"DKMap: Interactive Exploration of Vision-Language Alignment in Multimodal Embeddings via Dynamic Kernel Enhanced Projection"</em> got accepted by <b>IEEE VIS 2025</b>. Congratulations to all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2025.07</span>
          <span className="item">Our paper <em>"StressDiffVis: Visual Analytics for Multi-Model Stress Comparison"</em> got accepted by <b>IEEE VIS 2025</b>. Congratulations to Jiabao and all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2025.06</span>
          <span className="item">Our ACL paper <em>"CADReview: Automatically Reviewing CAD Programs with Error Detection and Correction"</em> was selected as <b>Oral Presentation</b>! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2025.05</span>
          <span className="item">Our paper <em>"CADReview: Automatically Reviewing CAD Programs with Error Detection and Correction"</em> got accepted by <b>ACL 2025</b>. Congratulations to Jiali and all the co-authors! 🎉</span>
        </div>

       <div className="news">
          <span className="time">2025.05</span>
          <span className="item">Our paper <em>"RuleEdit: Towards Rule-Level Knowledge Generalization to Mitigate Over-Editing in Large Language Models"</em> got accepted by <b>ACL (Findings) 2025</b>. Congratulations to Bihan and all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2025.04</span>
          <span className="item">I will be honored to serve as a program committee member for CCF CAD/CG 2025.</span>
        </div>

        <div className="news">
          <span className="time">2025.04</span>
          <span className="item">Our paper <em>"Collaborative Multi-LoRA Experts with Achievement-based Multi-Tasks Loss for Unified Multimodal Information Extraction"</em> got accepted by <b>IJCAI 2025</b>. Congratulations to Li and all the co-authors! 🎉</span>
        </div>

        <div className="news">
          <span className="time">2025.03</span>
          <span className="item">Our paper <em>"Empowering Multimodal Analysis with Visualization: A Survey"</em> got accepted by <b>Computer Science Review</b>. Congratulations to all the co-authors! 🎉</span>
        </div>


        <div className="news">
          <span className="time">2025.02</span>
          <span className="item">I will be honored to serve as a <a className="text-hl" href="https://ieeevis.org/year/2025/info/committees/program-committees/" target="_blank">short paper program committee member</a>👩‍⚖️ for IEEE VIS 2025.</span>
        </div>

        <div className="news">
          <span className="time">2025.01</span>
          <span className="item">Our paper <em>"Volume-Based Space-Time Cube for Large-Scale Continuous Spatial Time Series"</em> got accepted by <b>IEEE TVCG</b>. Congratulations to Jiabao and all the co-authors! 🎉</span>
        </div>
        <div className="news">
          <span className="time">2025.01</span>
          <span className="item">Our paper <em>"TraSculptor: Visual Analytics for Enhanced Decision-Making in Road Traffic Planning"</em> got accepted by <b>IEEE TVCG</b>. Congratulations to Yuanbang and all the co-authors! 🎉</span>
        </div>
      </div>
      
      <div style={{display: 'flex'}}>
        {current < sum ? <Button type="text" onClick={showMore}> ⬇️ Show more</Button> : null}
        {current > 6 ? <Button type="text" onClick={showLess}>⬆ Show Less</Button> : null}
      </div>
      
    </div>
  )
}

export default News