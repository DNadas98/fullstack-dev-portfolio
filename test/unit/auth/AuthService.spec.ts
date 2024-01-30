import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/service/AuthService';
import {DatabaseService} from "../../../src/database/service/DatabaseService";
import {IPasswordEncoder} from "../../../src/auth/service/IPasswordEncoder";
import {IJwtService} from "../../../src/auth/service/IJwtService";

describe('AuthService', () => {
  let service: AuthService;
  const mockDatabaseService = {
    //TODO: impl
  };

  const mockPasswordEncoder = {
    //TODO: impl
  };

  const mockJwtService = {
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
          provide: IPasswordEncoder,
          useValue: mockPasswordEncoder
        },
        {
          provide: IJwtService,
          useValue: mockJwtService
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
