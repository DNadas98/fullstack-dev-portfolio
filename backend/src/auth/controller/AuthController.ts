import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res
} from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { RegisterRequestDto } from "../dto/RegisterRequestDto";
import { CookieOptions, Request, Response } from "express";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { MessageResponseDto } from "../../common/dto/MessageResponseDto";
import { ErrorResponseDto } from "../../common/dto/ErrorResponseDto";
import { ConfigService } from "@nestjs/config";
import { Throttle } from "@nestjs/throttler";
import { authRateLimiterOptions } from "../../common/config/rateLimiterOptions";

@Controller("/api/v1/auth")
export class AuthController {
  private readonly refreshCookieName: string = "jwtrefresh";

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Throttle({ default: authRateLimiterOptions })
  @Post("register")
  async register(
    @Body() registerDto: RegisterRequestDto,
    @Res() response: Response
  ) {
    const userDto = await this.authService.register(registerDto, true);
    return response
      .status(HttpStatus.CREATED)
      .json(
        new MessageResponseDto(
          `User account with username ${userDto.username} created successfully`
        )
      );
  }

  @Throttle({ default: authRateLimiterOptions })
  @Post("login")
  async login(
    @Body() loginRequestDto: LoginRequestDto,
    @Res() response: Response
  ) {
    const loginResponseDto = await this.authService.login(loginRequestDto);
    const refreshToken = loginResponseDto.refreshToken;
    const loginResponse = {
      user: loginResponseDto.user,
      bearerToken: loginResponseDto.bearerToken
    };
    return this.addRefreshCookie(response, refreshToken)
      .status(HttpStatus.OK)
      .json(loginResponse);
  }

  @Post("refresh")
  async refresh(@Req() request: Request, @Res() response: Response) {
    try {
      const refreshToken = this.getRefreshCookie(request);
      if (!refreshToken?.length) {
        throw new UnauthorizedError();
      }
      const responseDto = await this.authService.refresh(refreshToken);
      return response.status(HttpStatus.OK).json(responseDto);
    } catch (e) {
      console.error(e);
      return this.removeRefreshCookie(response)
        .status(HttpStatus.UNAUTHORIZED)
        .json(new ErrorResponseDto(new UnauthorizedError().message));
    }
  }

  @Post("logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    if (this.getRefreshCookie(request)) {
      return this.removeRefreshCookie(response)
        .status(HttpStatus.OK)
        .json(new MessageResponseDto("User account signed out successfully"));
    }
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  private getRefreshCookie(request: Request): string {
    return request.cookies[this.refreshCookieName];
  }

  private getRefreshCookieOptions(): CookieOptions {
    const expirationMs = this.configService.get(
      "PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN"
    );
    if (!expirationMs || isNaN(parseInt(expirationMs))) {
      throw new InternalServerErrorException();
    }
    return {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: expirationMs
    };
  }

  private addRefreshCookie(response: Response, value: string): Response {
    response.cookie(
      this.refreshCookieName,
      value,
      this.getRefreshCookieOptions()
    );
    return response;
  }

  private removeRefreshCookie(response: Response): Response {
    const options = this.getRefreshCookieOptions();
    response.cookie(this.refreshCookieName, "", {
      ...options,
      maxAge: 0
    });
    return response;
  }
}
