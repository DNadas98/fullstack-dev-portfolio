import {
  Avatar, Button, Grid, Link, Stack, Tab, Tooltip, Typography
} from "@mui/material";
import LoadingSpinner from "../../../../common/utils/components/LoadingSpinner.tsx";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";
import {ForkRightOutlined, People, Star} from "@mui/icons-material";
import {ProjectContributorResponseDto} from "../dto/ProjectContributorResponseDto.ts";
import {ProjectImageResponseDto} from "../dto/ProjectImageResponseDto.ts";
import {ProjectCodeSnippetResponseDto} from "../dto/ProjectCodeSnippetResponseDto.ts";
import {ClockIcon} from "@mui/x-date-pickers";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {CodeBlock, nord} from "react-code-blocks";

interface ProjectDetailsPageProps {
  loading: boolean,
  project: GithubProjectResponseDto,
  readme: any,
  license: any,
  contributors: ProjectContributorResponseDto[],
  images: ProjectImageResponseDto[],
  codeSnippets: ProjectCodeSnippetResponseDto[],
  handleCodeSnippetClose: () => void,
  selectedFile: any,
  owner: any,
  decodeBase64Utf8: (encodedText: string) => string,
  codeSnippetLoading: boolean,
  tabValue: string,
  handleTabValueChange: (_event: React.SyntheticEvent, newValue: string) => void,
  handleCodeSnippetSelect: (snippetId: number) => void,
  getCodeSnippetText: (encodedText: string, startLine: string, endLine: string) => string
}

export default function ProjectDetailsPage(props: ProjectDetailsPageProps) {
  return (
    <Grid container height={"100%"} flexGrow={1} justifyContent={"center"}
          alignItems={"top"} mt={4} whiteSpace={"break-all"} maxWidth={1000}>
      <Grid item xs={11}>
        {props.loading
          ? <LoadingSpinner/>
          : props.project
            ?
            <Stack spacing={4} alignItems={"center"} justifyContent={"center"}>
              {/* NAME */}
              <Typography variant={"h4"}>
                {props.project.displayName}
              </Typography>
              {/* OWNER */}
              <Stack direction={"row"} flexWrap={"wrap"} spacing={2}
                     alignItems={"center"} sx={{color: "text.primary"}}>
                <Avatar sx={{height: 40, width: 40, bgcolor: "secondary.main"}}>
                  <img src={props.owner.avatar_url}
                       alt={""}
                       height={38} width={38}/>
                </Avatar>
                <Typography variant={"body1"} sx={{textTransform: "none"}}>
                  {props.owner.login} ({props.owner.name})
                </Typography>
              </Stack>
              {/* Stats */}
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item>
                  <Button variant={"outlined"} disabled startIcon={
                    <Star sx={{height: "1.5rem", color: "darkgoldenrod"}}/>}
                          sx={{":disabled": {color: "text.primary"}}}>
                    Stars: {props.project.stargazers_count}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant={"outlined"} disabled startIcon={
                    <People sx={{height: "1.5rem"}}/>}
                          sx={{":disabled": {color: "text.primary"}}}>
                    Subscribers: {props.project.subscribers_count}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant={"outlined"} disabled startIcon={
                    <ForkRightOutlined sx={{height: "1.5rem"}}/>}
                          sx={{":disabled": {color: "text.primary"}}}>
                    Forks: {props.project.forks}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant={"outlined"} disabled startIcon={
                    <ClockIcon sx={{height: "1.5rem"}}/>}
                          sx={{
                            textAlign: "left",
                            alignItems: "flex-start",
                            ":disabled": {color: "text.primary"}
                          }}>
                    Last Update: {new Date(props.project.pushed_at).toLocaleString()}
                  </Button>
                </Grid>
              </Grid>
              {/* Content - https://www.npmjs.com/package/mui-markdown */}
              <TabContext value={props?.selectedFile ? "3" : props.tabValue}>
                <TabList onChange={props.handleTabValueChange}
                         indicatorColor={"secondary"}
                         textColor={"inherit"}
                         variant={"scrollable"} scrollButtons={true}
                         allowScrollButtonsMobile={true}
                         sx={{maxWidth: "80vw"}}>
                  <Tab label={"Readme"} value={"1"}
                       sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>
                  <Tab label={"License"} value={"2"}
                       sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>
                  <Tab label={"Code Snippets"} value={"3"}
                       sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>
                </TabList>
                {/* Readme */}
                <TabPanel value={"1"}>
                  <Grid container justifyContent={"center"}>
                    <Grid item width={"fit-content"} maxWidth={"80vw"}
                          sx={{overflowX: "auto"}}>
                      <Markdown className={"markdown-content"}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}>
                        {props.decodeBase64Utf8(props.readme.content)}
                      </Markdown>
                    </Grid>
                  </Grid>
                </TabPanel>
                {/* License */}
                <TabPanel value={"2"}>
                  <Grid container justifyContent={"center"}>
                    <Grid item width={"fit-content"} maxWidth={"80vw"}
                          sx={{overflowX: "auto"}}>
                      <Markdown className={"markdown-content"}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}>
                        {props.decodeBase64Utf8(props.license.content)}
                      </Markdown>
                    </Grid>
                  </Grid>
                </TabPanel>
                {/* Code Snippets */}
                {props.codeSnippets?.length
                  ? <TabPanel value={"3"} sx={{width: "100%"}}>
                    {/* Code Snippet Selector */}
                    <Grid container spacing={1} justifyContent={"center"}>
                      <Grid item>
                        {props.codeSnippets.map(codeSnippet =>
                          <Button key={codeSnippet.id} onClick={() => {
                            props.handleCodeSnippetSelect(codeSnippet.id);
                          }} disabled={props.codeSnippetLoading}>
                            {codeSnippet.displayName}
                          </Button>
                        )}
                        <Button disabled={props.codeSnippetLoading}
                                onClick={props.handleCodeSnippetClose}>
                          {"Code Snippet 2"}
                        </Button>
                        <Button disabled={props.codeSnippetLoading}
                                onClick={props.handleCodeSnippetClose}>
                          {"Code Snippet 3"}
                        </Button>
                      </Grid>
                    </Grid>
                    {/* Code Snippet Viewer */}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {props.codeSnippetLoading
                          ? <LoadingSpinner/>
                          : props.selectedFile
                            ?
                            <Stack mt={4} spacing={2} textAlign={"justify"}>
                              <Tooltip title={"Open file on GitHub"}>
                                <Link href={props.selectedFile.html_url}
                                      target={"_blank"} rel={"noopener noreferrer"}
                                      color={"inherit"}
                                      sx={{width: "fit-content"}}>
                                  {props.selectedFile.name}
                                </Link>
                              </Tooltip>
                              <Typography>
                                {props.selectedFile.displayedDescription}
                              </Typography>
                              <Grid container justifyContent={"center"} rowSpacing={2}>
                                <Grid item width={"fit-content"} maxWidth={"80vw"}>
                                  <CodeBlock
                                    text={
                                      props.getCodeSnippetText(
                                        props.selectedFile.content,
                                        props.selectedFile.startLine,
                                        props.selectedFile.endLine)
                                    }
                                    language={props.selectedFile.name.split(".")[1]}
                                    showLineNumbers
                                    startingLineNumber={parseInt(props.selectedFile.startLine)}
                                    wrapLongLines={false}
                                    theme={nord}
                                    customStyle={{"padding": "1rem"}}/>
                                </Grid>
                                <Grid item xs={12} textAlign={"center"}>
                                  <Button onClick={props.handleCodeSnippetClose}>
                                    Close
                                  </Button>
                                </Grid>
                              </Grid>
                            </Stack>
                            : <Grid container textAlign={"center"}>
                              <Grid item xs={12}>
                                <Typography mt={4} variant={"body2"}>
                                  Select a code snippet to view its details!
                                </Typography>
                              </Grid></Grid>
                        }
                      </Grid>
                    </Grid>
                  </TabPanel>
                  : <></>}
              </TabContext>
            </Stack>
            : <Grid item xs={12} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"h6"}>
                Work In Progress
              </Typography>
            </Grid>}
      </Grid>
    </Grid>)
    ;
}
