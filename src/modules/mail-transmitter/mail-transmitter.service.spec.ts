import { Test, TestingModule } from '@nestjs/testing';
import { MailTransmitterService } from './mail-transmitter.service';

describe('MailTransmitterService', () => {
  let service: MailTransmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailTransmitterService],
    }).compile();

    service = module.get<MailTransmitterService>(MailTransmitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
