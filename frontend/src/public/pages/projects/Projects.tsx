import ProjectPage from "./components/ProjectPage.tsx";
import {useEffect, useState} from "react";
import {
  useNotification
} from "../../../common/notification/context/NotificationProvider.tsx";
import {publicJsonFetch} from "../../../common/api/service/apiService.ts";
import {GithubProjectResponseDto} from "./dto/GithubProjectResponseDto.ts";
import {useNavigate} from "react-router-dom";

export default function Projects() {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<GithubProjectResponseDto[]>([]);
  const notification = useNotification();
  const navigate = useNavigate();

  const handleError = (message: string) => {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: message
    });
  };

  async function loadProjects() {
    const defaultError =
      "Project data is currently unavailable, please try again later";
    try {
      setLoading(true);
      const response = await publicJsonFetch({
        path: "github/projects"
      });
      if (!response || response.status > 399 || !response.data) {
        handleError(response?.error ?? defaultError);
      }
      setProjects(response.data as GithubProjectResponseDto[]);
    } catch (e) {
      handleError(defaultError);
    } finally {
      setLoading(false);
    }
  }

  const handleProjectDetailsClick = (name: string) => {
    navigate(name);
  };

  useEffect(() => {
    loadProjects().then();
  }, []);

  return (
    <ProjectPage handleProjectDetailsClick={handleProjectDetailsClick}
                 loading={loading}
                 projects={projects}/>);
};
