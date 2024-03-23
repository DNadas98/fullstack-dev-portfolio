import {Button, Grid, Link, Stack, Tooltip, Typography} from "@mui/material";
import LoadingSpinner from "../../../../common/utils/components/LoadingSpinner.tsx";
import {ProjectCodeSnippetResponseDto} from "../dto/ProjectCodeSnippetResponseDto.ts";
import {GithubContentResponseDto} from "../dto/GithubContentResponseDto.ts";
import CodeContentCard from "./CodeContentCard.tsx";

interface CodeSnippetViewerProps {
  codeSnippets: ProjectCodeSnippetResponseDto[],
  handleCodeSnippetSelect: (snippetId: number) => void,
  handleCodeSnippetClose: () => void,
  codeSnippetLoading: boolean,
  selectedFile: GithubContentResponseDto | undefined
}

export default function CodeSnippetViewer(props: CodeSnippetViewerProps) {
  return (
    <Grid container spacing={1} justifyContent={"center"}>
      <Grid item>
        {props.codeSnippets.map(codeSnippet =>
          <Button key={codeSnippet.id} onClick={() => {
            props.handleCodeSnippetSelect(codeSnippet.id);
          }} disabled={props.codeSnippetLoading}>
            {codeSnippet.displayName}
          </Button>
        )}
      </Grid>
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
                <Grid item width={"fit-content"} maxWidth={"90vw"}
                      sx={{overflowX: "auto"}}>
                  <CodeContentCard content={props.selectedFile.content}
                                   name={props.selectedFile.name}
                                   startLine={props.selectedFile.startLine}
                                   endLine={props.selectedFile.endLine}/>
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
  );
}
