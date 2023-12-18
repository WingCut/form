import { Outlet } from "react-router-dom";
import { ConfigContext } from "../contexts/config.context";
const HomeLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
export default HomeLayout;
