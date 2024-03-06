import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import{Mail, Security, Storage}from "@mui/icons-material"
import ProgressSteps from "./components/ProgressSteps";
import CardGrid from "./components/CardGrid";
import {ListWithLinks} from "./components/ListWithLinks";
import {Link} from "react-router-dom";

const AboutMe = () => {
  const palette = useTheme().palette;
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} paddingTop={2} paddingLeft={2} paddingRight={2}
              textAlign={"center"}
              sx={{backgroundColor: "primary.main"}}>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Stack direction={"row"} spacing={1} justifyContent={"center"}
                     sx={{flexWrap: "wrap"}}>
                <Typography variant={"h4"} sx={{whiteSpace: "nowrap"}}>
                  Hello, my name is
                </Typography>
                <Typography variant={"h4"} sx={{whiteSpace: "nowrap"}} gutterBottom>
                  Dániel Nádas
                </Typography>
              </Stack>
              <Typography variant={"h6"} mb={2}>
                I’m an aspiring junior software developer
              </Typography>
              <Typography variant={"h6"}>
                I'm currently working on:
              </Typography>
              <ListWithLinks items={[
                {
                  path: "https://github.com/DNadas98/spring-project-manager",
                  text: "Java Spring Project Manager Application"
                },
                {
                  path: "https://github.com/DNadas98/fullstack-dev-portfolio",
                  text: "Full-stack Web Developer Portfolio"
                },
                {
                  path: "https://github.com/DNadas98/cc-dungeoncrawl",
                  text: "Java Dungeon Crawl RPG Game"
                }
              ]}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={2} paddingLeft={2}
            paddingRight={2}>
        <Grid item md={12} lg={10} textAlign={"center"} mt={4}>
          <Typography variant={"h4"} gutterBottom>
            Current Studies
          </Typography>
          <Typography variant={"h6"} gutterBottom>
            Full-stack software development at
            <Button href={"https://codecool.com"}
                    rel={"noopener noreferrer"}
                    target={"_blank"}
                    variant={"text"}>
              <img src={"/codecool.webp"} height={30}/>
              <Typography color={"text.primary"} variant={"body1"}>
                CodeCool
              </Typography>
            </Button>
            bootcamp
          </Typography>
          <Typography>One year full-time course</Typography>
          <ProgressSteps steps={
            [{
              title: "Programming Basics", content: [
                "HTML, CSS",
                "Javascript",
                "Git, GitHub",
                "Agile, SCRUM"
              ]
            }, {
              title: "Web Frameworks", content: [
                "Express JS",
                "MongoDB",
                "React JS",
                "CRUD, REST, MVC"
              ]
            }, {
              title: "OOP with Java", content:
                [
                  "Java I/O, Streams",
                  "OOP, SOLID",
                  "Design Patterns",
                  "Unit Testing"
                ]
            }, {
              title: "Advanced - Spring", content:
                [
                  "Java Spring Boot",
                  "Spring Security",
                  "Docker, Nginx",
                  "Integration Testing"
                ]
            }]} maxProgress={100}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={2} padding={2}>
        <Grid item xs={12} textAlign={"center"} mt={4}>
          <Typography variant={"h4"} color={"text.primary"}>
            Tech Stack
          </Typography>
        </Grid>
        <Grid item xs={10} textAlign={"center"}>
          <CardGrid items={[{
            title: "Frontend development", 
            content: [{iconSrc:"/html.svg", text: "HTML"},
              {iconSrc: "css.svg", text: "CSS"},
              {iconSrc: "javascript.svg", text: "Javascript"},
              {iconSrc: "typescript.svg", text: "Typescript"},
              {iconSrc: "react.svg", text: "React JS"},
              {iconSrc: "/materialui.svg", text: "Material UI"}]
          }, {
            title: "Backend development", 
            content: [{iconSrc: "java.svg", text: "Java"},
              {iconSrc: "spring.svg", text: "Java Spring"},
              {iconSrc: "nodejs.svg", text: "Node.js"},
              {iconSrc: "express.svg", text: "Express JS"},
              {iconSrc: "nestjs.svg", text: "Nest JS"},
              {iconSrc: "php.svg", text: "PHP"}]
          }, {
            title: "Databases, ORM/ODM", 
            content: [{iconSrc: "postgresql.svg", text: "PostgreSQL"},
              {iconSrc: "mysql.svg", text: "MySQL"},
              {iconSrc: "mongodb.png", text: "MongoDB"},
              {iconSrc: "spring.svg", text: "Spring Data JPA"},
              {iconSrc: "prisma.svg", text: "Prisma ORM"},
              {iconSrc: "mongoose.svg", text: "Mongoose JS"}]
          }, {
            title: "Integration, Deployment", 
            content: [{iconSrc: "/githubactions.svg", text: "Github Actions"},
              {iconSrc: "/docker.svg", text: "Docker (Compose)"},
              {iconSrc: "/nginx.svg", text: "NginX"},
              {iconSrc: "/apache.png", text: "Apache HTTP Server"}]
          }, {
            title: "Security, Authentication", 
            content: [{iconSrc: "/spring.svg", text: "Spring Security"},
              {iconSrc: "/jwt.svg", text: "Json Web Token"},
              {iconSrc: "/oauth2.svg", text: "OAuth 2.0"},
              {icon: <Security/>, text: "API Security Basics"}]
          }, {
            title: "Server management", 
            content: [{iconSrc: "/linux.png", text: "Linux VPS"},
              {icon: <Mail/>, text: "E-mail Server"},
              {icon:<Storage/>, text: "Web Storage, FTP"},
              {iconSrc: "wordpress.svg", text: "Wordpress CMS"}]
          }]}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={4} paddingTop={2}
            paddingBottom={2}>
        <Grid item xs={10} sm={8} md={5} lg={4}>
          <Card style={{backgroundColor: "transparent"}}
                sx={{height: "100%"}}>
            <CardHeader title={"Self Definition"}/>
            <CardContent>
              <Typography sx={{textShadow: "none"}} textAlign={"justify"}>
                I have initially explored programming as a hobby and I have found my
                true passion in this field, leading me to transition from vehicle
                engineering
                to a software development course.
                Throughout this year, I've focused on backend development, also
                exploring
                skills in security practices and database management. Additionally,
                I've worked with frontend technologies and gained experience in
                integration and deployment strategies, testing, and collaboration
                tools.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10} sm={8} md={5} lg={4}>
          <Card style={{backgroundColor: "transparent"}}
                sx={{height: "100%"}}>
            <CardHeader title={"Strengths"}/>
            <CardContent>
              <Typography sx={{textShadow: "none"}} textAlign={"justify"}>
                My journey underlines my adaptability and my eagerness to learn. My
                project-based learning experience at CodeCool has sharpened my
                problem-solving skills and perserverance. I am self-motivated,
                consistently seeking new knowledge, value collaboration and teamwork,
                committed to quality and meeting project goals.
                I'm always ready to pick up a new technology, design pattern,
                practice that I have not used yet, and implement it in my projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}
                textAlign={"center"}>
            <Grid item xs={10} sm={4}>
              <Button variant={"outlined"}
                      href={"/cv-daniel-nadas.pdf"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`,whiteSpace:"nowrap"}}>
                Download my CV
              </Button>
            </Grid>
            <Grid item xs={10} sm={4}>
              <Button variant={"outlined"}
                      component={Link}
                      to={"/projects"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`,whiteSpace:"nowrap"}}>
                View my projects
              </Button>
            </Grid>
            <Grid item xs={10} sm={4}>
              <Button variant={"outlined"}
                      component={Link}
                      to={"/contact"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`,whiteSpace:"nowrap"}}>
                Contact Me
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>);
};

export default AboutMe;
