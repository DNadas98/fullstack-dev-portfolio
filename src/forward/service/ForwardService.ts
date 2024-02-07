import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Request} from "express";
import axios, {AxiosRequestConfig} from "axios";

@Injectable()
export class ForwardService {
  constructor(private readonly configService: ConfigService) {
  }

  /**
   * Forwards requests to the GitHub REST API returns the response
   * @param req The original request
   * @param path The part of the URL after the GitHub REST API base URL
   * @link https://docs.github.com/en/rest?apiVersion=2022-11-28
   * @see axios.request
   * @see AxiosRequestConfig
   * @throws AxiosError
   */
  async forwardGitHubApiRequest(req: Request, path: string): Promise<any> {
    const baseUrl = this.configService.get("PORTFOLIO_GITHUB_API_BASE_URL");
    const token = this.configService.get("PORTFOLIO_GITHUB_API_TOKEN");

    const config = this.getRequestConfig(req, baseUrl, path, token);

    const apiResponse = await axios.request(config);
    return apiResponse.data;
  }

  private getRequestConfig(
    req: Request, baseUrl: string, path: string, token: string
  ): AxiosRequestConfig {
    return {
      method: req.method,
      url: `${baseUrl}/${path}`,
      headers: {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      },
      timeout: 20000, timeoutErrorMessage: "Request to GitHub REST API timed out"
    };
  }
}
