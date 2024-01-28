import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserService } from './PrismaUserService';
import { IUserService } from './IUserService';
import { DatabaseService } from '../../database/database.service';
import { IPasswordEncoder } from '../../auth/IPasswordEncoder';

describe('UsersService', () => {
  let service: IUserService;

  const mockDatabaseService = {
    //TODO: impl
  };

  const mockPasswordEncoder = {
    //TODO: impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaUserService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: IPasswordEncoder,
          useValue: mockPasswordEncoder,
        },
      ],
    }).compile();

    service = module.get<PrismaUserService>(PrismaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //TODO: create tests
});
