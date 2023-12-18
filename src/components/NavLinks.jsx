import { NavLink } from "react-router-dom";
import { Flex, Row, Col } from "antd";

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
const alignOptions = ["flex-start", "center", "flex-end"];

const NavLinks = ({ isBigSidebar }) => {
  const links = [
    {
      text: "add product",
      path: ".",
    },
    {
      text: "all products",
      path: "products",
    },
  ];

  return (
    <Flex justify="space-evenly" align="flex-start">
      {links.map((link) => {
        const { text, path } = link;
        return (
          <NavLink to={path} key={text} end>
            {text}
          </NavLink>
        );
      })}
    </Flex>
  );
};

export default NavLinks;
