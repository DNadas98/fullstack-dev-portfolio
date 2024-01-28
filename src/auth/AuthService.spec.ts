import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './AuthService';
import {DatabaseService} from "../database/database.service";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {UserService} from "../users/service/UserService";

describe('AuthService', () => {
  let service: AuthService;
  const mockDatabaseService = {
    //TODO: impl
  };

  const mockUserService = {
    //TODO: impl
  };

  const mockPasswordEncoder = {
    //TODO: impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        },
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: IPasswordEncoder,
          useValue: mockPasswordEncoder
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
