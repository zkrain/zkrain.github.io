import "./Resume.css";
import { paperList } from "../assets/info";
import { PAPER } from "../typings/types";

function Resume() {
  let journal = paperList.filter((p) => p.type === "Journal");
  let conf = paperList.filter((p) => p.type === "Conference");
  let others = paperList.filter((p) => p.type === "Other");

  const findAllIndexAsFirstAuthor = (author: string, papers: PAPER[]) => {
    return papers.reduce((acc: number[], curr: PAPER, index: number) => {
      if (curr.authorsA.split(", ")[0].includes(author)) {
        acc.push(papers.length - index);
      }
      return acc;
    }, []);
  };

  const getPubofFirstAuthor = (author: string) => {
    let output: string[] = [];
    const input: [PAPER[], string][] = [
      [journal, "J"],
      [conf, "C"],
      [others, "W"],
    ];
    input.forEach((items) => {
      findAllIndexAsFirstAuthor(author, items[0]).forEach((idx) => {
        output.push(`${items[1]}${idx}`);
      });
    });
    return output.join(", ");
  };

  return (
    <div id="cv">
      <h1>Zikun Deng</h1>
      <div className="contact">
        <div className="address">
          <span>School of Software Engineering</span>
          <span>B7, South China University of Technology</span>
          <span>Guangzhou Higher Education Mega Centre, Panyu District, Guangzhou</span>
        </div>
        <div className="misc">
          <span>
            <a href="mailto:zkdeng@scut.edu.cn">
              zkdeng@scut.edu.cn{" "}
              <i className="fa-solid fa-envelope"></i>
            </a>
          </span>
          <span>
            <a href="https://zkdeng.org/">
              https://zkdeng.org/{" "}
              <i className="fa-solid fa-globe"></i>
            </a>
          </span>
        </div>
      </div>

      <h3>PROFESSIONAL EXPERIENCE</h3>
      <div>
        <div className="entry">
          <span className="time">2023.08-Present</span>
          <span className="item">
            <span className="cv-hl">South China University of Technology</span>, Guangzhou, China <br />
            <em>Associate Professor, School of Software Engineering</em> <br />
          </span>
        </div>
        <div className="entry">
          <span className="time">2019.04-2021.04</span>
          <span className="item">
            <span className="cv-hl">Zhejiang Lab</span>, Hangzhou, China <br />{" "}
            <em>Algorithm Engineer, with Prof. Yingcai Wu and Prof. Wei Chen</em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2018.04-2018.09</span>
          <span className="item">
            <span className="cv-hl">Urban Computing Lab, JDT</span>, Beijing, China{" "}
            <br /> <em>Algorithm Engineer & Research Intern, with Prof. Yu Zheng</em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2018.01-2018.04</span>
          <span className="item">
            <span className="cv-hl">Zhejiang Univeristy</span>, Hangzhou, China{" "}
            <br /> <em>Undergraduate Research Intern, with Prof. Yingcai Wu</em>
          </span>
        </div>
      </div>

      <h3>EDUCATION</h3>
      <div>
        <div className="entry">
          <span className="time">2018.9-2023.6</span>
          <span className="item">
            <span>
              <span className="cv-hl">Ph.D. </span>in{" "}
              <span className="cv-hl">Computer Science</span>
            </span>
            <br />
            <span>
              Zhejiang Univeristy
            </span>
            <br />
            <span>
              <b>Advisor: </b>
              <em>Yingcai Wu</em>
            </span>
            <br />
            <span>
              <b>Thesis: </b>
              <em>
                Visual Propagation Analytics of Urban Spatiotemporal Event
              </em>
            </span>
            <br />
            <span>
              <b>Committee: </b>
              <em>
                Xiaoru Yuan, Wei Chen, Ying Zhao, Siming Chen, Xiao Xie
              </em>
            </span>
          </span>
        </div>
        <div className="entry">
          <span className="time">2014.8-2018.6</span>
          <span className="item">
            <span>
              <span className="cv-hl">B.Eng </span>in{" "}
              <span className="cv-hl">Transportation Engineering</span>
            </span>
            <br />
            <span>Sun Yat-sen University, Guangzhou, China</span>
            <br />
            <span>
              <b>Advisor: </b>
              <em>Renxin Zhong</em>
            </span>
            <br />
          </span>
        </div>
      </div>

      <h3>PUBLICATIONS</h3>
      <span>* denotes the corresponding author</span>
      <h4>Peer-reviewed Journal Publications</h4>
      <div>
        {journal.map((paper: PAPER, index: number) => {
          let first = journal[0].year;
          let year = index === 0 ? `${first}` : "";
          if (index !== 0 && first !== paper.year) {
            year = `${paper.year}`;
            first = paper.year;
          }
          return (
            <div className="entry">
              <span className="time pub-time">
                <span className="pub-year">{year}</span>
                <span className="pub-index">[J{journal.length - index}]</span>
              </span>
              <span className="item">
                {paper.authorsA}
                <span className="cv-hl">Zikun Deng</span>
                {paper.authorsB.length > 0 ? <>{paper.authorsB}.</> : <>.</>}
                <span style={{ fontWeight: 500, color: "#1F6FEB" }}>
                  {" "}
                  {paper.title}
                </span>
                . In <em>{paper.full}</em>.
                {paper.honor.length > 0 ? (
                  <>
                    <br />
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#1F6FEB",
                        borderBottom: "1px solid #1F6FEB",
                      }}
                    >
                      馃弳 {paper.honor}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <h4>Peer-reviewed Conference Publications</h4>
      <div>
        {conf.map((paper: PAPER, index: number) => {
          let first = conf[0].year;
          let year = index === 0 ? `${first}` : "";
          if (index !== 0 && first !== paper.year) {
            year = `${paper.year}`;
            first = paper.year;
          }
          return (
            <div className="entry">
              <span className="time pub-time">
                <span className="pub-year">{year}</span>
                <span className="pub-index">[C{conf.length - index}]</span>
              </span>
              <span className="item">
                {paper.authorsA}
                <span className="cv-hl">Zikun Deng</span>
                {paper.authorsB.length > 0 ? <>{paper.authorsB}.</> : <>.</>}
                <span style={{ fontWeight: 500, color: "#1F6FEB" }}>
                  {" "}
                  {paper.title}
                </span>
                . In <em>{paper.full}</em>.
                {paper.honor.length > 0 ? (
                  <>
                    <br />
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#1F6FEB",
                        borderBottom: "1px solid #1F6FEB",
                      }}
                    >
                      馃弳 {paper.honor}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* <h4>Pre-prints, Workshop Papers, Posters, and Art Works</h4>
      <div>
        {others.map((paper: PAPER, index: number) => {
          let first = others[0].year;
          let year = index === 0 ? `${first}` : "";
          if (index !== 0 && first !== paper.year) {
            year = `${paper.year}`;
            first = paper.year;
          }
          return (
            <div className="entry">
              <span className="time pub-time">
                <span className="pub-year">{year}</span>
                <span className="pub-index">[W{others.length - index}]</span>
              </span>
              <span className="item">
                {paper.authorsA}
                <span className="cv-hl">Zikun Deng</span>
                {paper.authorsB.length > 0 ? <>{paper.authorsB}.</> : <>.</>}
                <span style={{ fontWeight: 500, color: "#1F6FEB" }}>
                  {" "}
                  {paper.title}
                </span>
                . In <em>{paper.full}</em>.
                {paper.honor.length > 0 ? (
                  <>
                    <br />
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#1F6FEB",
                        borderBottom: "1px solid #1F6FEB",
                      }}
                    >
                      馃弳 {paper.honor}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </span>
            </div>
          );
        })}
      </div> */}

      <h3>SELECTED HONORS & AWARDS</h3>
      <div>
        <div className="entry">
          <span className="time">2025</span>
          <span className="item">Best Paper, CHI 2025</span>
        </div>
        <div className="entry">
          <span className="time">2017-21</span>
          <span className="item">
            Postgraduate Studentship (鈭?16,300 HKD/yr), Hong Kong Univeristy of
            Science and Technology
          </span>
        </div>
        <div className="entry">
          <span className="time">2020</span>
          <span className="item">
            Best Paper Honorable Mention Award, ChinaVis 2020
          </span>
        </div>
        <div className="entry">
          <span className="time">2017</span>
          <span className="item">
            Outstanding Graduates of Zhejiang University
          </span>
        </div>
        <div className="entry">
          <span className="time">2017</span>
          <span className="item">
            Excellent Graduation Thesis of Zhejiang University
          </span>
        </div>
        <div className="entry">
          <span className="time">2014-16</span>
          <span className="item">
            University Scholarships, Zhejiang University
          </span>
        </div>
      </div>

      <h3>GRANTS</h3>
      <div>
        <div className="entry">
          <span className="time">2025</span>
          <span className="item">
            <span>
              Leverage GenAI and Graphical Models and Reasoning to Innovate for
              Scientific Discovery
            </span>
            <br />
            拢217k, a 2-year KTP project with P&G.
          </span>
        </div>
        <div className="entry">
          <span className="time">2024</span>
          <span className="item">
            <a
              href="https://gulbenkian.pt/emifund/news/2024-call-for-proposals-results/"
              target="_blank"
            >
              FAMOUS: Fake Activity Market Observation System of Unethical
              Services
            </a>{" "}
            (Co-I)
            <br />
            鈧?00k, funded by European Media and Information Fund.
          </span>
        </div>
      </div>

      <h3 id="teaching">TEACHING EXPERIENCE</h3>
      <h4>Lecturer</h4>
      <div>
        <div className="entry">
          <span className="time">2024-25</span>
          <span className="item">
            <span className="cv-hl">
              CSC3833: Data Visualization and Visual Analytics
            </span>{" "}
            (Newcastle Univeristy)
            <br />A visualization course in the undergraduate level.
          </span>
        </div>
        <div className="entry">
          <span className="time">2025</span>
          <span className="item">
            <span className="cv-hl">CSC8646: Generative AI in Business</span>{" "}
            (Newcastle Univeristy)
            <br />A course in the postgraduate level on the applications of
            generative AI in business contexts.
          </span>
        </div>
        <div className="entry">
          <span className="time">2024</span>
          <span className="item">
            <span className="cv-hl">CSC8632: Data Science in the wild</span>{" "}
            (Newcastle Univeristy)
            <br />A practical course in the postgraduate level that immerses
            students in real-world data science challenges.
          </span>
        </div>
      </div>

      <h4>Guest Lecturer</h4>
      <div>
        <div className="entry">
          <span className="time">2024-25</span>
          <span className="item">
            <span className="cv-hl">
              Data Visualization in Human-centered Data Science
            </span>{" "}
            (Newcastle Univeristy)
            <br />
            In <em>Human-AI Interaction</em>, and{" "}
            <em>Complex Data Visualization</em> (Postgraduate Level Course)
          </span>
        </div>
        <div className="entry">
          <span className="time">2023</span>
          <span className="item">
            <span className="cv-hl">
              Data Visualization for Human-data Interaction
            </span>{" "}
            (Univeristy of Edinburgh)
            <br />
            In <em>Data Science for Design</em> (Postgraduate Level Course)
          </span>
        </div>
        <div className="entry">
          <span className="time">2021</span>
          <span className="item">
            <span className="cv-hl">Designing Data-GIFs for Storytelling</span>{" "}
            (Zhejiang Univeristy)
            <br />
            In <em>Data Visualization</em> (Undergraduate Level Course)
          </span>
        </div>
      </div>
      <h4>Tutor</h4>
      <div>
        <div className="entry">
          <span className="time">2023</span>
          <span className="item">
            <span className="cv-hl">Case Studies in Design Informatics</span>{" "}
            (Univeristy of Edinburgh)
            <br />
            <em>Graduate Level Course (Instructor: John Vines)</em>
          </span>
        </div>
      </div>
      <h4>Teaching Assistant</h4>
      <div>
        <div className="entry">
          <span className="time">2023</span>
          <span className="item">
            <span className="cv-hl">Msc Dissertation Project</span> (Univeristy
            of Edinburgh)
            <br />
            <em>Graduate Level (Instructor: Benjamin Bach)</em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2018</span>
          <span className="item">
            <span className="cv-hl">
              COMP1021 Introduction to Computer Science
            </span>{" "}
            (Hong Kong Univeristy of Science and Technology)
            <br />
            <em>Undergraduate Level Course</em>
          </span>
        </div>
      </div>

      <h3>MENTORING EXPERIENCE</h3>
      <h4>Advisees</h4>
      <div>
        <div className="entry">
          <span className="time">PhD</span>
          <span className="item">
            <a className="cv-hl" href="https://www.xinshu.info">
              Xin Shu
            </a>
            , PhD student at Newcastle University
            <br />
            <em>
              AI-assisted instrument learning [{getPubofFirstAuthor("Xin Shu")}]
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <a
              className="cv-hl"
              href="https://ppppppppeter.github.io/HongyuWang/"
            >
              Hongyu Wang
            </a>
            , PhD student at Newcastle University
            <br />
            <em>
              Human-AI collaboration for code generation and understanding
            </em>
          </span>
        </div>
      </div>

      <h4>Mentoring</h4>
      <div>
        <div className="entry">
          <span className="time">PhD</span>
          <span className="item">
            <span className="cv-hl">
              <a
                href="https://maple-possum-c4d.notion.site/Zhongsu-LUO-9a76b04931a848179b6f8488033b3a2a"
                target="_blank"
              >
                Zhongsu Luo
              </a>
            </span>
            , PhD student at Zhejiang Univeristy
            <br />
            <em>Data Wrangling [{getPubofFirstAuthor("Zhongsu Luo")}]</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              <a href="http://yiyinyinguu.github.io/" target="_blank">
                Lu Ying
              </a>
            </span>
            , PhD student at Zhejiang Univeristy
            <br />
            <em>
              Automatic Generation of Metaphoric Glyph-based Visualization [
              {getPubofFirstAuthor("Lu Ying")}]
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              <a href="https://ahugh19.github.io/" target="_blank">
                Junxiu Tang
              </a>
            </span>
            , PhD student at Zhejiang Univeristy
            <br />
            <em>
              Animated Visualization for Visual Data Storytelling [
              {getPubofFirstAuthor("Junxiu Tang")}]
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              <a href="https://shellywhen.github.io/" target="_blank">
                Liwenhan Xie
              </a>
            </span>
            , PhD student at HKUST
            <br />
            <em>
              Creating Emordle: Animating Word Cloud for Emotion Expression [
              {getPubofFirstAuthor("Liwenhan Xie")}]
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              <a href="https://crcrcry.notion.site/" target="_blank">
                Ran Chen
              </a>
            </span>
            , PhD student at Zhejiang University
            <br />
            <em>
              Declarative Construction of Visualization Coordination and Data
              Transformation [{getPubofFirstAuthor("Ran Chen")}]
            </em>
          </span>
        </div>

        {/* MASTER */}
        <div className="entry">
          <span className="time">Master</span>
          <span className="item">
            <span className="cv-hl">
              <a href="https://yhuang.top/" target="_blank">
                Yanwei Huang
              </a>
            </span>
            , Master student at Zhejiang Univeristy
            <br />
            <em>
              Interactive Table Synthesis with Natural Language [
              {getPubofFirstAuthor("Yanwei Huang")}]
            </em>
          </span>
        </div>

        {/* Undergraduate */}
        <div className="entry">
          <span className="time">UG</span>
          <span className="item">
            <span className="cv-hl">
              <a href="https://jiajunzhuchris.github.io/" target="_blank">
                Jiajun Zhu
              </a>
            </span>
            , Undergraduate student at Zhejiang University
            <br />
            <em>Data Wrangling [{getPubofFirstAuthor("Jiajun Zhu")}]</em>
          </span>
        </div>
      </div>
      {/* <h4>Thesis Committee</h4> */}

      {/* <h3 id="talks">INVITED TALKS AND OUTREACH</h3>
      <div>
        <div className="entry">
          <span className="time">2025</span>
          <span className="item">
            <span className="cv-hl">
              Empowering Communication and Exploration of Visualizations with AI
            </span>
            <br />
            <em>Inria Bordeaux, France (2025.10)</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              Human-AI Collaboration for Visualization-empowered Data Tasks
            </span>
            <br />
            <em>ZJU Summer School, Hangzhou, China (2025.07)</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              From Data to Dialogue: How AI and Visualization Empower Human
              Engagement with Data
            </span>
            <br />
            <em>
              ELLIIT: Visualization-Empowered Human-in-the-Loop Artificial
              Intelligence, Norrk枚ping, Sweden (2025.05)
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2024</span>
          <span className="item">
            <span className="cv-hl">
              Interactive Pattern Explanation for Network Visualization
            </span>
            <br />
            <em>#VizTig Symposium (2024.09), IEEE VIS Conference (2024.10)</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              Interfaces and Grammars for Interactive Network Visualisation
            </span>
            <br />
            <em>
              Edinburgh Data Visualisation Meetup (2024.05), Edinburgh, UK
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              Engaging with Insight: Creating and Analyzing Engagement with Data
              Visualization
            </span>
            <br />
            <em>Swansea Univeristy (2024.05), Swansea, UK</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              Data Visualization for Human-AI Teaming
            </span>
            <br />
            <em>
              {" "}
              Research & Innovation Showcase in Data Science & AI (2024.03),
              Newcastle Upon Tyne, UK
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2022</span>
          <span className="item">
            <span className="cv-hl">
              MetaGlyph: Automatic Generation of Metaphoric Glyph-based
              Visualization
            </span>
            <br />
            <em>IEEE VIS Conference (2022.10), Oklahoma City, USA</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              Rigel: Transforming Tabular Data By Declarative Mapping
            </span>
            <br />
            <em>IEEE VIS Conference (2022.10), Oklahoma City, USA</em>
          </span>
        </div>
        <div className="entry">
          <span className="time">2021</span>
          <span className="item">
            <span className="cv-hl">
              Enhancing data-driven storytelling with animated visualization
            </span>
            <br />
            <em>
              Tongji University & Fudan University (2021.06), Shanghai, China
            </em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              DancingWords: Exploring Animated Word Clouds to Tell Stories
            </span>
            <br />
            <em>ChinaVis (2021.10), Xi'an, China</em>
          </span>
        </div>
        <div className="entry">
          <span className="time"></span>
          <span className="item">
            <span className="cv-hl">
              What Makes a Data-GIF Understandable ?
            </span>
            <br />
            <em>IEEE VIS Conference (2020.10), Virtual, Online</em>
          </span>
        </div>
      </div> */}

      <h3 id="service">SERVICE</h3>
      <h4>Organizing Committees</h4>
      <div>
        <div className="entry">
          <span className="time">2025</span>
          <span className="item">
            <span className="cv-hl">Paper Co-Chair (Education Track)</span>,{" "}
            <a
              href="https://eurovis.org.uk/committees-and-organization/"
              target="_blank"
            >
              EuroVis 2026
            </a>
          </span>
        </div>
        <div className="entry">
          <span className="time">2024</span>
          <span className="item">
            <span className="cv-hl">Co-Organizer</span>,{" "}
            <a
              href="https://blogs.ncl.ac.uk/nova/viztig-symposium-2024/"
              target="_blank"
            >
              Visualization Turing Interest Group (#VizTIG) Symposium{" "}
            </a>
          </span>
        </div>
        <div className="entry">
          <span className="time">2023</span>
          <span className="item">
            <span className="cv-hl">Student Volunteer Chair</span>,{" "}
            <a
              href="https://informationplusconference.com/2023/"
              target="_blank"
            >
              Information+ Conference
            </a>
          </span>
        </div>
        <div className="entry">
          <span className="time">2022-</span>
          <span className="item">
            <span className="cv-hl">Co-Organizer</span>,{" "}
            <a href="https://www.meetup.com/datavisedinburgh/" target="_blank">
              Edinburgh Data Visualisation Meetup
            </a>
          </span>
        </div>
      </div>
      <h4>Program Committees</h4>
      <div>
        <div className="entry">
          <span className="time">VIS</span>
          <span className="item">
            <span className="cv-hl">VIS</span> full paper track 2025, short
            paper track 2022-24, <br />
            <span className="cv-hl">EuroVis</span> full paper track 2026, <br />
            <span className="cv-hl">PacificVis</span> TVCG track 2025-26,
            VisNotes 2024, <br />
            <span className="cv-hl">ChinaVis</span> full paper track 2022-24
          </span>
        </div>
        <div className="entry">
          <span className="time">HCI</span>
          <span className="item">
            <span className="cv-hl">CHI</span> full paper track 2024-26
          </span>
        </div>
      </div>

      <h4>Paper Reviewing</h4>
      <div>
        <div className="entry">
          <span className="time">VIS</span>
          <span className="item">
            <span className="cv-hl">VIS</span> 2021-25,{" "}
            <span className="cv-hl">TVCG</span> 2022-25,{" "}
            <span className="cv-hl">EuroVis</span> 2020-26,{" "}
            <span className="cv-hl">PacificVis</span> 2021-26,{" "}
            <span className="cv-hl">ChinaVis</span> 2021-24,{" "}
            <span className="cv-hl">VI</span> 2024
          </span>
        </div>
        <div className="entry">
          <span className="time">HCI</span>
          <span className="item">
            <span className="cv-hl">CHI</span> 2021-26,{" "}
            <span className="cv-hl">CSCW</span> 2023
          </span>
        </div>
      </div>

      <h4>Community Service</h4>
      <div>
        <div className="entry">
          <span className="time">2020</span>
          <span className="item">
            <span className="cv-hl">Student Volunteer</span>, IEEE VIS
          </span>
        </div>
        <div className="entry">
          <span className="time">2019</span>
          <span className="item">
            <span className="cv-hl">Teaching Assistant Coordiate</span>, CSE
            Despartment, Hong Kong University of Science and Technology
          </span>
        </div>
      </div>

      {/* <h3>MEDIA COVERAGE</h3> */}
    </div>
  );
}

export default Resume;
