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
   * @link https://docs.github.com/en/rest?apiVersion=2022-11-28
   * @see axios.request
   * @see AxiosRequestConfig
   * @throws AxiosError
   */
  async forwardGitHubApiRequest(req: Request): Promise<any> {
    const path = req.url.split("/github/")[1];
    const baseUrl = this.configService.get("PORTFOLIO_GITHUB_API_BASE_URL");
    const token = this.configService.get("PORTFOLIO_GITHUB_API_TOKEN");

    const config: AxiosRequestConfig = {
      method: req.method,
      url: `${baseUrl}/${path}`,
      headers: {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      },
      timeout: 20000,
      timeoutErrorMessage: "Request to GitHub REST API timed out"
    };

    const apiResponse = await axios.request(config);
    return apiResponse.data;
  }
}
