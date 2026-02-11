import { Row, Col } from "antd";
import { PAPER } from "../typings/types";
import "./Publication.css";
import {
  FilePdfOutlined,
  VideoCameraOutlined,
  GithubOutlined,
  SnippetsOutlined,
  BookOutlined,
  LinkOutlined,
  ShakeOutlined,
} from "@ant-design/icons";

interface Props {
  selected: PAPER;
  style?: React.CSSProperties;
}

function Paper(props: Props) {
  const paper = props.selected;

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "Paper":
        return <FilePdfOutlined />;
      case "Video":
        return <VideoCameraOutlined />;
      case "DOI":
        return <BookOutlined />;
      case "Homepage":
        return <LinkOutlined />;
      case "Demo":
        return <ShakeOutlined />;
      case "Code":
        return <GithubOutlined />;
      case "Appendix":
        return <SnippetsOutlined />;
      default:
        return <SnippetsOutlined />;
    }
  };

  return (
    <Row className="paper" style={props.style}>
      <Col span={7} className="thumb">
        <img src={`/${paper.thumb}`} alt="" />
      </Col>
      <Col span={17} className="info">
        <p>
          <a href={paper.materials.Paper} target="_blank" className="title">
            {paper.title}
          </a>
        </p>
        <p className="author-list">
          <span className="authors">{paper.authorsA}</span>
          <span className="me">Zikun Deng</span>
          <span className="authors">{paper.authorsB}</span>
        </p>
        <p className="pub">
          <span className="abbr">{paper.abbr}</span>
          <span className="full">{paper.full}</span>
        </p>
        {paper.honor.length !== 0 ? (
          <p className="honor">
            <b>🏆 {paper.honor}</b>
          </p>
        ) : null}

        <p className="materials">
          {Object.entries(paper.materials).map((entry: [string, string]) => (
            <a
              className="material"
              href={entry[1]}
              target="_blank"
              key={entry[0]}
            >
              {getMaterialIcon(entry[0])}
              <span style={{ marginLeft: 4 }}>{entry[0]}</span>
            </a>
          ))}
        </p>
      </Col>
    </Row>
  );
}

export default Paper;
