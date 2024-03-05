import * as apiService from "../../common/api/service/apiService.ts";
import {useAuthentication} from "./useAuthentication.ts";
import {RefreshResponseDto} from "../dto/RefreshResponseDto.ts";
import {AuthenticationDto} from "../dto/AuthenticationDto.ts";

export default function useRefresh() {
  const authentication = useAuthentication();
  const defaultErrorMessage = "Failed to refresh authentication";
  const refresh = async (): Promise<RefreshResponseDto> => {
    try {
      const refreshResponse = await apiService.publicJsonFetch({
        path: "auth/refresh", method: "POST"
      });

      if (!refreshResponse
        || refreshResponse.status > 399
        || !(refreshResponse as any)?.bearerToken
        || !(refreshResponse as any)?.user
        || refreshResponse.error) {
        return {error: refreshResponse?.error ?? defaultErrorMessage};
      }
      const authenticationDto = refreshResponse as AuthenticationDto;
      authentication.authenticate(authenticationDto);
      return {authentication: authenticationDto};
    } catch (e) {
      return {error: defaultErrorMessage};
    }
  };
  return refresh;
}
