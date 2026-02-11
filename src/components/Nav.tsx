import { Anchor, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import "./Nav.css";
import { useEffect, useState } from "react";

interface Props {
  setComp: (c: string) => void;
}

function Nav(props: Props) {
  const [screen, setScreen] = useState(window.innerWidth);
  // for desktop version
  const anchorItems = [
    {
      key: "1",
      href: "#about",
      title: (
        <span className="anchorItem" onClick={() => props.setComp("home")}>
          About
        </span>
      ),
    },
    {
      key: "2",
      href: "#publication",
      title: (
        <span
          className="anchorItem"
          onClick={() => props.setComp("publication")}
        >
          Publication
        </span>
      ),
    },
    {
      key: "3",
      href: "#prospectives",
      title: (
        <span
          className="anchorItem"
          onClick={() => props.setComp("prospectives")}
        >
          Work with me
        </span>
      ),
    },
  ];

  // for mobile dropdown menu
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a href="#about" onClick={() => props.setComp("home")}>
          About
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="#publication-list"
          onClick={() => props.setComp("publication-list")}
        >
          Publication
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a href="#prospectives" onClick={() => props.setComp("prospectives")}>
          Work with me
        </a>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="menu" className="nav">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="/avatar.png" style={{ width: 25, height: 25 }} />
        <span className="name">Zikun Deng</span>
      </div>
      {screen > 660 ? (
        <Anchor direction="horizontal" items={anchorItems} />
      ) : (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <a onClick={(e) => e.preventDefault()}>
              <MenuUnfoldOutlined style={{ fontSize: 20 }} />
            </a>
          </Space>
        </Dropdown>
      )}
    </div>
  );
}

export default Nav;
