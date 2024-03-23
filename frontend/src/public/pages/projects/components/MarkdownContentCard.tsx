import {Card, CardContent} from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {decodeBase64Utf8} from "../utils/getCodeSnippetText.ts";

interface MarkdownContentCardProps {
  content: string;
}

export default function MarkdownContentCard(props: MarkdownContentCardProps) {
  const content = decodeBase64Utf8(props.content);

  return (
    <Card sx={{padding: 1}}
          variant={"elevation"} elevation={10}>
      <CardContent>
        <Markdown className={"markdown-content"}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}>
          {content}
        </Markdown>
      </CardContent>
    </Card>
  );
}
