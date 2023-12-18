import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import Categories from "./pages/Categories";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <AddProduct />,
        },
        {
          path: "products",
          element: <AllProducts />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
