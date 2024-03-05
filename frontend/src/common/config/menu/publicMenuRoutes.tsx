import {IMenuRoutes} from "../../routing/IMenuRoutes.ts";
import AboutMe from "../../../public/pages/aboutme/AboutMe.tsx";
import Login from "../../../authentication/pages/login/Login.tsx";
import ContactMe from "../../../public/pages/contactme/ContactMe.tsx";
import Projects from "../../../public/pages/projects/Projects.tsx";
export const publicMenuRoutes: IMenuRoutes = {
  routePrefix: "/",
  elements: [
    {path: "", name: "About Me", element: <AboutMe/>},
    {path: "projects", name: "Projects", element: <Projects/>},
    {path: "contact", name: "Contact Me", element: <ContactMe/>},
    {path: "login", name: "Sign in", element: <Login/>}
  ]
}
