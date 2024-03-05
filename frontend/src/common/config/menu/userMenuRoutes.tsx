import {IMenuRoutes} from "../../routing/IMenuRoutes.ts";
import AboutMe from "../../../public/pages/aboutme/AboutMe.tsx";
import Projects from "../../../public/pages/projects/Projects.tsx";
import ContactMe from "../../../public/pages/contactme/ContactMe.tsx";

export const userMenuRoutes: IMenuRoutes = {
  routePrefix: "",
  elements: [
    {path: "", name: "About Me", element: <AboutMe/>},
    {path: "projects", name: "Projects", element: <Projects/>},
    {path: "contact", name: "Contact Me", element: <ContactMe/>}
  ]
};
