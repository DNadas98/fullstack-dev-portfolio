import {Body, Controller, HttpStatus, Post, Req, Res} from "@nestjs/common";
import {AuthService} from "./AuthService";
import {RegisterRequestDto} from "./dto/RegisterRequestDto";
import {CookieOptions, Request, Response} from "express";
import {LoginRequestDto} from "./dto/LoginRequestDto";
import {UnauthorizedError} from "./error/UnauthorizedError";
import {MessageResponseDto} from "../dto/MessageResponseDto";
import {DataResponseDto} from "../dto/DataResponseDto";
import {ErrorResponseDto} from "../dto/ErrorResponseDto";

@Controller("/api/v1/auth")
export class AuthController {
  private readonly refreshCookieName: string = "jwtrefresh";

  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  async register(@Body() registerDto: RegisterRequestDto, @Res() response: Response) {
    const userDto = await this.authService.register(registerDto);
    return response.status(HttpStatus.CREATED).json(new MessageResponseDto(
      `User account with username ${userDto.username} created successfully`));
  }

  @Post("login")
  async login(@Body() loginRequestDto: LoginRequestDto, @Res() response: Response) {
    const loginResponseDto = await this.authService.login(loginRequestDto);
    const refreshToken = loginResponseDto.refreshToken;
    const loginResponse = {
      user: loginResponseDto.user,
      bearerToken: loginResponseDto.bearerToken
    };
    return this.addRefreshCookie(response, refreshToken).status(HttpStatus.OK).json(loginResponse);
  }

  @Post("refresh")
  async refresh(@Req() request: Request, @Res() response: Response) {
    try {
      const refreshToken = this.getRefreshCookie(request);
      if (!refreshToken?.length) {
        throw new UnauthorizedError();
      }
      const bearerToken = await this.authService.refresh(refreshToken);
      return response.status(HttpStatus.OK).json(new DataResponseDto({
        bearerToken: bearerToken
      }));
    } catch (e) {
      console.error(e);
      return this.removeRefreshCookie(response).status(HttpStatus.UNAUTHORIZED).json(new ErrorResponseDto(
        new UnauthorizedError().message
      ));
    }
  }

  @Post("logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    if (this.getRefreshCookie(request)) {
      return this.removeRefreshCookie(response).status(HttpStatus.OK).json(new MessageResponseDto(
        "User account signed out successfully"
      ));
    }
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  private getRefreshCookie(request: Request): string {
    return request.cookies[this.refreshCookieName];
  }

  private getRefreshCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: Number(process.env.PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN)
    };
  }

  private addRefreshCookie(response: Response, value: string): Response {
    response.cookie(this.refreshCookieName, value, this.getRefreshCookieOptions());
    return response;
  }

  private removeRefreshCookie(response: Response): Response {
    const options = this.getRefreshCookieOptions();
    response.cookie(this.refreshCookieName, "", {
      ...options, maxAge: 0
    });
    return response;
  }
}
