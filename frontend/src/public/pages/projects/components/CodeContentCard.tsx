import {Card, CardContent} from "@mui/material";
import {CodeBlock, hybrid} from "react-code-blocks";
import {getCodeSnippetText} from "../utils/getCodeSnippetText.ts";

interface CodeContentCardProps {
  content: string;
  startLine?: string | undefined;
  endLine?: string | undefined;
  name: string;
}

export default function CodeContentCard(props: CodeContentCardProps) {
  const content = getCodeSnippetText(props.content, props.startLine, props.endLine);

  return (
    <Card variant={"elevation"} elevation={10}>
      <CardContent>
        <CodeBlock
          text={content}
          language={props.name.split(".")[1]}
          showLineNumbers
          startingLineNumber={props?.startLine
            ? parseInt(props?.startLine)
            : 1}
          wrapLongLines={false}
          theme={hybrid} customStyle={{"background": "transparent"}}/>
      </CardContent>
    </Card>
  );
}
