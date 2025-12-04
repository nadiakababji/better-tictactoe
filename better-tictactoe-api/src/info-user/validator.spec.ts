import { Test, TestingModule } from '@nestjs/testing';
import { InfoUserService } from './info-user.service';

describe('InfoUserService', () => {
  let service: InfoUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoUserService],
    }).compile();

    service = module.get<InfoUserService>(InfoUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  const testCases: Array<[string, any, boolean]> = [
    ['valid data', { name: 'Jonathan', age: 25, married: false, dateOfBirth: '2000-01-01' }, true],
    ['name too short', { name: 'Ana', age: 25, married: false, dateOfBirth: '2000-01-01' }, false],
    ['age under range', { name: 'Jonathan', age: 0, married: false, dateOfBirth: '1999-01-01' }, false],
    ['age over range', { name: 'Jonathan', age: 151, married: false, dateOfBirth: '1999-01-01' }, false],
    ['married missing & age > 18', { name: 'Jonathan', age: 23, dateOfBirth: '2002-01-01' }, false],
    ['married missing & age < 18', { name: 'Jonathan', age: 12, dateOfBirth: '2013-01-01' }, true],
    ['date does not match age', { name: 'Jonathan', age: 25, married: false, dateOfBirth: '2020-01-01' }, false],
  ];

  it.each(testCases)('%s', async (_name, payload, expected) => {
    const res = await service.validateInfo(payload);
    expect(res.success).toBe(expected);
  });
});
