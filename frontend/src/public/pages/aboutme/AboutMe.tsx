import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import {Mail, Security, Storage} from "@mui/icons-material";
import ProgressSteps from "./components/ProgressSteps";
import CardGrid from "./components/CardGrid";
/*import {ListWithLinks} from "./components/ListWithLinks";*/
import {Link} from "react-router-dom";

const AboutMe = () => {
  const palette = useTheme().palette;
  return (
    <>
      <Grid container justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12} paddingTop={2} paddingLeft={2} paddingRight={2}
              sx={{backgroundColor: "primary.main"}}>
          <Stack alignItems={"center"} justifyContent={"center"}
                 spacing={2} sx={{flexWrap: "wrap"}} marginBottom={11}>
            <Box>
              <Typography variant={"h3"} sx={{
                whiteSpace: "nowrap",
                fontSize: "2.75rem"
              }} gutterBottom>
                Dániel Nádas
              </Typography>
              <Typography variant={"h6"}>
                Junior Software Developer
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center"
              sx={{transform: "translateY(-50%)", zIndex: 2}}>
          <Avatar src={"/media/profile-picture.png"}
                  alt={" "}
                  sx={{height: "9rem", width: "9rem"}}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={2} paddingLeft={2}
            paddingRight={2}>
        <Grid item md={12} lg={10} textAlign={"center"} mt={-4}>
          <Typography variant={"h4"} gutterBottom>
            Current Studies
          </Typography>
          <Typography variant={"h6"} gutterBottom>
            Full-stack Software Development at
            <Button href={"https://codecool.com"}
                    rel={"noopener noreferrer"}
                    target={"_blank"}
                    variant={"text"}>
              <img src={"/media/codecool.webp"} alt={"Codecool"} height={30}/>
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
            title: "Frontend Development",
            content: [{iconSrc: "/media/html.svg", text: "HTML"},
              {iconSrc: "/media/css.svg", text: "CSS"},
              {iconSrc: "/media/javascript.svg", text: "Javascript"},
              {iconSrc: "/media/typescript.svg", text: "Typescript"},
              {iconSrc: "/media/react.svg", text: "React JS"},
              {iconSrc: "/media/materialui.svg", text: "Material UI"}]
          }, {
            title: "Backend Development",
            content: [{iconSrc: "/media/java.svg", text: "Java"},
              {iconSrc: "/media/spring.svg", text: "Java Spring"},
              {iconSrc: "/media/nodejs.svg", text: "Node.js"},
              {iconSrc: "/media/express.svg", text: "Express JS"},
              {iconSrc: "/media/nestjs.svg", text: "Nest JS"},
              {iconSrc: "/media/php.svg", text: "PHP"}]
          }, {
            title: "Databases, ORM/ODM",
            content: [{iconSrc: "/media/postgresql.svg", text: "PostgreSQL"},
              {iconSrc: "/media/mysql.svg", text: "MySQL"},
              {iconSrc: "/media/mongodb.png", text: "MongoDB"},
              {iconSrc: "/media/spring.svg", text: "Spring Data JPA"},
              {iconSrc: "/media/prisma.svg", text: "Prisma ORM"},
              {iconSrc: "/media/mongoose.svg", text: "Mongoose JS"}]
          }, {
            title: "Integration, Deployment",
            content: [{iconSrc: "/media/githubactions.svg", text: "Github Actions"},
              {iconSrc: "/media/docker.svg", text: "Docker (Compose)"},
              {iconSrc: "/media/nginx.svg", text: "NginX"},
              {iconSrc: "/media/apache.png", text: "Apache HTTP Server"}]
          }, {
            title: "Security, Authentication",
            content: [{iconSrc: "/media/spring.svg", text: "Spring Security"},
              {iconSrc: "/media/jwt.svg", text: "Json Web Token"},
              {iconSrc: "/media/oauth2.svg", text: "OAuth 2.0"},
              {icon: <Security/>, text: "API Security Basics"}]
          }, {
            title: "Server management",
            content: [{iconSrc: "/media/linux.png", text: "Linux VPS"},
              {icon: <Mail/>, text: "E-mail Server"},
              {icon: <Storage/>, text: "Web Storage, FTP"},
              {iconSrc: "/media/wordpress.svg", text: "Wordpress CMS"}]
          }]}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={4} paddingTop={2}
            paddingBottom={2}>
        <Grid item xs={10} sm={8} md={5} lg={4}>
          <Card variant={"elevation"} elevation={10}
                style={{backgroundColor: `${palette.background.default}`}}
                sx={{height: "100%"}}>
            <CardHeader title={"Self Definition"}/>
            <CardContent>
              <Typography textAlign={"justify"}>
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
          <Card variant={"elevation"} elevation={10}
                style={{backgroundColor: `${palette.background.default}`}}
                sx={{height: "100%"}}>
            <CardHeader title={"Strengths"}/>
            <CardContent>
              <Typography textAlign={"justify"}>
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
                      href={"/media/documents/cv-daniel-nadas.pdf"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`, whiteSpace: "nowrap"}}>
                Download my CV
              </Button>
            </Grid>
            <Grid item xs={10} sm={4}>
              <Button variant={"outlined"}
                      component={Link}
                      to={"/projects"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`, whiteSpace: "nowrap"}}>
                View my projects
              </Button>
            </Grid>
            <Grid item xs={10} sm={4}>
              <Button variant={"outlined"}
                      component={Link}
                      to={"/contact"}
                      fullWidth
                      sx={{color: `${palette.text.primary}`, whiteSpace: "nowrap"}}>
                Contact Me
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>);
};

export default AboutMe;
