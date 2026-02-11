import { Divider } from "antd";
import "./About.css";

function About() {
  return (
    <div id="about">
      <div className="avatar">
        <img src="/img/zkdeng.png" />
        <div className="greeting">
          <div>
            <span style={{ fontFamily: "semibold", fontSize: 28 }}>
              Hi! I'm <span className="bg-hl">Zikun Deng</span>
            </span>
            <span
              style={{ fontFamily: "SimSun", fontWeight: 300, marginLeft: 5 }}
            >
              (邓紫坤)
            </span>
          </div>

          <div className="positions">
            <span
              style={{
                fontSize: 18,
                fontFamily: "sans-serif",
                fontWeight: 300,
                color: "rgb(40, 40, 40)",
              }}
            >
              <span>Associate Professor </span>
              <span>@ South China University of Technology</span>
            </span>
            <span
              style={{
                fontSize: 16,
                fontFamily: "sans-serif",
                fontWeight: 300,
                paddingTop: 3,
              }}
            >
              Visual Analytics / Urban Computing / Human-Computer Interaction /
              AI
            </span>
          </div>

          <div className="links">
            <a href="mailto:zkdeng@scut.edu.cn">
              <i className="fa-solid fa-envelope fa-xl"></i>
            </a>
            <a href="https://scholar.google.com/citations?user=rKhw1wMAAAAJ&hl=en">
              <i className="fa-brands fa-google fa-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <Divider />
      <div className="content">
        <p>
          I'm a <b style={{ fontWeight: 500 }}>Associate Professor</b> at{" "}
          <a className="hl-about" href="https://www2.scut.edu.cn/sse/">
            School of Software Engineering, South China University of Technology
          </a>
          . Prior to that, I received my B.Eng. degree from the School of
          Intelligent Systems Engineering, Sun Yat-sen University in 2018, and
          Ph.D. degree from the State Key Lab of CAD & CG, Zhejiang University
          in 2023, supervised by{" "}
          <a className="hl-about" href="http://www.ycwu.org/" target="_blank">
            Prof. Yingcai Wu
          </a>{" "}
          in{" "}
          <a className="hl-about" href="https://zjuidg.org/" target="_blank">
            Interactive Data Group
          </a>
          .
        </p>

        <p>
          <b style={{ fontWeight: 500 }}>Research Highlights.</b> I have published over 20 papers in top-tier journals and conferences, including IEEE TVCG, IEEE ITS, CVMJ, IJCAI, AAAI, and ACM CHI.
          My research focuses on{" "}
          <span className="hl">Visual Analytic, Artificial Intelligence, Data Mining, Human-Computer Interaction</span>, and
          <span className="hl"> their applications in Smart City, Digital Twins, and Industry 4.0</span>.
        </p>

        <p>
          🙌 I am actively seeking <b>motivated students</b> to work on Visual Analytics (VA), Artificial Intelligence (AI) and Human-Computer Interaction (HCI).
          {/* Please find more excited projects and information in <a className="hl-about">work with me</a> if you are interested in! */}
        </p>

        <h3>EXPERIENCE</h3>
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

        {/* <h3>Professional Experience</h3>
        <ul>
          <li>
            <b>2023.08-Present</b> Associate Professor, School of Software
            Engineering, South China University of Technology, Guangzhou, China.
          </li>
          <li>
            <b>2019.04-2021.04</b> Algorithm Engineer, Zhejiang Lab, Hangzhou,
            China (with Prof. Yingcai Wu and Prof. Wei Chen).
          </li>
          <li>
            <b>2018.04-2018.09</b> Algorithm Engineer & Research Intern, Urban
            Computing Lab, JDT, Beijing, China (with Prof. Yu Zheng).
          </li>
          <li>
            <b>2018.01-2018.04</b> Undergraduate Research Intern, Zhejiang
            Univeristy, Hangzhou, China (with Prof. Yingcai Wu).
          </li>
        </ul>

        <h3>Education</h3>
        <ul>
          <li>
            <b>2018.9-2023.6</b> Ph.D. in Computer Science, Zhejiang Univeristy.
            Advisor: Yingcai Wu. Thesis: <em>Visual Propagation Analytics of
            Urban Spatiotemporal Event</em>.
          </li>
          <li>
            <b>2014.8-2018.6</b> B.Eng in Transportation Engineering, Sun
            Yat-sen University, Guangzhou, China. Advisor: Renxin Zhong.
          </li>
        </ul> */}

        
      </div>
    </div>
  );
}

export default About;
