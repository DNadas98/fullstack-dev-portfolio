import {Outlet} from "react-router-dom";

import {Role} from "../dto/Role.ts";
import useLogout from "../hooks/useLogout.ts";
import {useEffect, useState} from "react";
import useRefresh from "../hooks/useRefresh.ts";
import LoadingSpinner from "../../common/utils/components/LoadingSpinner.tsx";
import {useAuthentication} from "../hooks/useAuthentication.ts";
import {
  useNotification
} from "../../common/notification/context/NotificationProvider.tsx";

interface RequireAuthProps {
  allowedRoles: Array<Role>;
}

export default function RequireAuthentication({allowedRoles}: RequireAuthProps) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const authentication = useAuthentication();
  const notification = useNotification();
  const refresh = useRefresh();
  const logout = useLogout();

  async function handleUnauthorized() {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: "Unauthorized"
    });
    await logout();
  }

  async function handleAccessDenied() {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: "Access Denied"
    });
    await logout();
  }

  useEffect(() => {
    async function verifyAllowed() {
      let role = authentication.getRole();
      if (!authentication.getBearerToken()?.length) {
        const refreshResponseDto = await refresh();
        if (!refreshResponseDto?.authentication || refreshResponseDto?.error) {
          return await handleUnauthorized();
        }
        const refreshResponse = refreshResponseDto.authentication;
        role = refreshResponse.user?.role;
      }
      if (!role || !allowedRoles.includes(role)) {
        return await handleAccessDenied();
      }
      setAllowed(true);
    }

    verifyAllowed().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (<LoadingSpinner/>);
  } else if (allowed) {
    return (<Outlet/>);
  }
  return null;
}
