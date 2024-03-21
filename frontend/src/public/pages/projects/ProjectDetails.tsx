import {useEffect, useState} from "react";
import {
  useNotification
} from "../../../common/notification/context/NotificationProvider.tsx";
import {publicJsonFetch} from "../../../common/api/service/apiService.ts";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import ProjectDetailsPage from "./components/ProjectDetailsPage.tsx";
import {ProjectContributorResponseDto} from "./dto/ProjectContributorResponseDto.ts";
import {ProjectImageResponseDto} from "./dto/ProjectImageResponseDto.ts";

export default function ProjectDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const notification = useNotification();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  // TODO: create DTOs, replace 'any'
  const [project, setProject] = useState<any>(undefined);
  const projectName = useParams()?.projectName;
  const [owner, setOwner] = useState<any>(undefined);
  const [readme, setReadme] = useState<any>(undefined);
  const [license, setLicense] = useState<any>(undefined);
  const [codeSnippets, setCodeSnippets] = useState<any>([]);
  const [contributors, setContributors] = useState<ProjectContributorResponseDto[]>([]);
  const [images, setImages] = useState<ProjectImageResponseDto[]>([]);

  const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<any>(undefined);
  const [codeSnippetLoading, setCodeSnippetLoading] = useState<boolean>(false);

  const handleError = (message: string) => {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: message
    });
    navigate("/projects");
  };

  async function loadProjects() {
    const defaultError = "Failed to load project details, please try again later";
    try {
      setLoading(true);
      if (!projectName?.length) {
        handleError(defaultError);
        return;
      }
      const response = await publicJsonFetch({
        path: `github/projects/${projectName}`
      });
      if (!response || response.status > 399 || !response?.data?.project) {
        handleError(response?.error
          ?? defaultError);
        return;
      }
      setProject(response.data.project);
      setOwner(response.data.owner);
      if (response.data.readme) {
        setReadme(response.data.readme);
      }
      if (response.data.license) {
        setLicense(response.data.license);
      }
      if (response.data?.contributors) {
        setContributors(response.data.contributors);
      }
      if (response.data?.codeSnippets) {
        setCodeSnippets(response.data.codeSnippets);
      }
      if (response.data?.images) {
        setImages(response.data.images);
      }
    } catch (e) {
      setProject(undefined);
      handleError(defaultError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects().then();
  }, []);

  const handleCodeSnippetSelect = (snippetId: number) => {
    setSearchParams({snippetId: snippetId.toString()});
  };

  const handleCodeSnippetClose = () => {
    setSearchParams({});
  };

  const handleCodeSnippetError = (message: string) => {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: message
    });
    handleCodeSnippetClose();
  };

  const loadCodeSnippet = async (id: string) => {
    const defaultError = "Failed to load code snippet, please try again later";
    try {
      setCodeSnippetLoading(true);
      if (!id || isNaN(parseInt(id)) || parseInt(id) < 1) {
        handleCodeSnippetError(defaultError);
        return;
      }
      const response = await publicJsonFetch({
        path: `github/code-snippets/${id}`
      });
      if (!response || response.status > 399 || !response?.data) {
        handleCodeSnippetError(response?.error ?? defaultError);
        return;
      }
      const selected = response.data;
      setSelectedCodeSnippet(selected);
    } catch (e) {
      setSelectedCodeSnippet(undefined);
      handleCodeSnippetError(defaultError);
    } finally {
      setCodeSnippetLoading(false);
    }
  };

  useEffect(() => {
    const snippetId = searchParams.get("snippetId");
    if (snippetId?.length) {
      loadCodeSnippet(snippetId);
    } else {
      setSelectedCodeSnippet(undefined);
    }
  }, [searchParams]);

  function decodeBase64Utf8(encodedText: string) {
    const binaryString = window.atob(encodedText);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }

  function getCodeSnippetText(encodedText: string, startLine: string, endLine: string) {
    const decodedText = decodeBase64Utf8(encodedText);
    if (!startLine || !endLine || isNaN(parseInt(startLine)) || isNaN(parseInt(endLine))) {
      return decodedText;
    }
    return decodedText.split("\n").slice(parseInt(startLine) - 1, parseInt(endLine)).join("\n");
  }

  const [tabValue, setTabValue] = useState<string>("1");
  const handleTabValueChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    handleCodeSnippetClose();
  };

  return (
    <ProjectDetailsPage
      tabValue={tabValue}
      handleTabValueChange={handleTabValueChange}
      handleCodeSnippetSelect={handleCodeSnippetSelect}
      handleCodeSnippetClose={handleCodeSnippetClose}
      selectedFile={selectedCodeSnippet}
      loading={loading} project={project} owner={owner} readme={readme}
      license={license} contributors={contributors} images={images}
      codeSnippets={codeSnippets}
      codeSnippetLoading={codeSnippetLoading}
      decodeBase64Utf8={decodeBase64Utf8}
      getCodeSnippetText={getCodeSnippetText}/>
  );
};
