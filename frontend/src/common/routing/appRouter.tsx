import {createBrowserRouter} from "react-router-dom";
import Layout from "../../public/layout/Layout.tsx";
import ErrorPage from "../../public/pages/errorPages/ErrorPage.tsx";
import {publicMenuRoutes} from "../config/menu/publicMenuRoutes.tsx";
import NotFound from "../../public/pages/errorPages/NotFound.tsx";
import RequireAuthentication
  from "../../authentication/components/RequireAuthentication.tsx";
import {Role} from "../../authentication/dto/Role.ts";
import UserLayout from "../../user/layout/UserLayout.tsx";
import {userMenuProfileRoutes} from "../config/menu/userMenuProfileRoutes.tsx";
import Login from "../../authentication/pages/login/Login.tsx";

const appRouter = createBrowserRouter([
  /* public */
  {
    path: "",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      ...publicMenuRoutes.elements,
      {path: "/login", element: <Login/>},
      {path: "/*", element: <NotFound/>}
    ]
  },
  /* user */
  {
    path: "/user/",
    element: <RequireAuthentication allowedRoles={[Role.USER, Role.ADMIN]}/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <UserLayout/>,
        children: [
          ...userMenuProfileRoutes.elements,
          {
            path: "*", element: <NotFound/>
          }
        ]
      }
    ]
  }
]);

export default appRouter;
