import { Test, TestingModule } from '@nestjs/testing';
import { BcryptPasswordEncoder } from './BcryptPasswordEncoder';

describe('PasswordEncoderService', () => {
  let service: BcryptPasswordEncoder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptPasswordEncoder],
    }).compile();

    service = module.get<BcryptPasswordEncoder>(BcryptPasswordEncoder);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
