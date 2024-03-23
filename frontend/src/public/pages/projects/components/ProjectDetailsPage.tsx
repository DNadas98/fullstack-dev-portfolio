import {Grid, Stack, Tab, Typography} from "@mui/material";
import LoadingSpinner from "../../../../common/utils/components/LoadingSpinner.tsx";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";
import {ProjectContributorResponseDto} from "../dto/ProjectContributorResponseDto.ts";
import {ProjectImageResponseDto} from "../dto/ProjectImageResponseDto.ts";
import {ProjectCodeSnippetResponseDto} from "../dto/ProjectCodeSnippetResponseDto.ts";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent} from "react";
import ProjectOwnerDetails from "./ProjectOwnerDetails.tsx";
import {GithubContentResponseDto} from "../dto/GithubContentResponseDto.ts";
import {GithubProjectOwnerResponseDto} from "../dto/GithubProjectOwnerResponseDto.ts";
import MarkdownContentCard from "./MarkdownContentCard.tsx";
import CodeSnippetViewer from "./CodeSnippetViewer.tsx";
import ProjectStatistics from "./ProjectStatistics.tsx";

interface ProjectDetailsPageProps {
  loading: boolean,
  project: GithubProjectResponseDto | undefined,
  readme: GithubContentResponseDto | undefined,
  license: GithubContentResponseDto | undefined,
  contributors: ProjectContributorResponseDto[],
  images: ProjectImageResponseDto[],
  codeSnippets: ProjectCodeSnippetResponseDto[],
  handleCodeSnippetClose: () => void,
  selectedFile: GithubContentResponseDto | undefined,
  owner: GithubProjectOwnerResponseDto | undefined,
  codeSnippetLoading: boolean,
  tabValue: string,
  handleTabValueChange: (_event: SyntheticEvent, newValue: string) => void,
  handleCodeSnippetSelect: (snippetId: number) => void,
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
              <ProjectOwnerDetails owner={props.project.owner}/>
              {/* Stats */}
              <ProjectStatistics project={props.project}/>
              {/* Content - https://www.npmjs.com/package/mui-markdown */}
              <TabContext value={props?.selectedFile ? "3" : props.tabValue}>
                <TabList onChange={props.handleTabValueChange}
                         indicatorColor={"secondary"}
                         textColor={"inherit"}
                         variant={"scrollable"} scrollButtons={true}
                         allowScrollButtonsMobile={true}
                         sx={{maxWidth: "80vw"}}>
                  {props.readme &&
                    <Tab label={"Readme"} value={"1"}
                         sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>}
                  {props.license &&
                    <Tab label={"License"} value={"2"}
                         sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>}
                  {props.codeSnippets?.length > 1 &&
                    <Tab label={"Code Snippets"} value={"3"}
                         sx={{whiteSpace: "nowrap", minWidth: "max-content"}}/>
                  }
                </TabList>
                {/* Readme */}
                {props.readme &&
                  <TabPanel value={"1"}>
                    <Grid container justifyContent={"center"}>
                      <Grid item width={"fit-content"} maxWidth={"80vw"}
                            sx={{overflowX: "auto"}}>
                        <MarkdownContentCard
                          content={props.readme.content}/>
                      </Grid>
                    </Grid>
                  </TabPanel>}
                {/* License */}
                {props.license &&
                  <TabPanel value={"2"}>
                    <Grid container justifyContent={"center"}>
                      <Grid item width={"fit-content"} maxWidth={"80vw"}
                            sx={{overflowX: "auto"}}>
                        <MarkdownContentCard
                          content={props.license.content}/>
                      </Grid>
                    </Grid>
                  </TabPanel>
                }
                {/* Code Snippets */}
                {props.codeSnippets?.length
                  ? <TabPanel value={"3"} sx={{width: "100%"}}>
                    {/* Code Snippet Viewer */}
                    <CodeSnippetViewer codeSnippets={props.codeSnippets}
                                       codeSnippetLoading={props.codeSnippetLoading}
                                       selectedFile={props.selectedFile}
                                       handleCodeSnippetSelect={props.handleCodeSnippetSelect}
                                       handleCodeSnippetClose={props.handleCodeSnippetClose}/>
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
