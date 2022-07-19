import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AbService } from './ab.service';
import { ExperimentStatus, PopulatedExperimentEnv } from './types';

describe('AbService', () => {
  let service: AbService;
  let experimentEnv: PopulatedExperimentEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbService,
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AbService>(AbService);
  });

  beforeEach(() => {
    experimentEnv = {
      _type: 'Experiment',
      environmentId: '1',
      experimentId: '2',
      status: ExperimentStatus.ACTIVATED,
      environment: {
        uuid: '1',
        projectId: '1',
        clientKey: 'abcd',
        name: 'First env',
      },
      experiment: {
        uuid: '1',
        name: 'First experient',
        createdAt: new Date('1992-06-21'),
        description: 'First experiment description',
        key: 'fepfjzpejfpzejfpzejfpezj',
        variants: [
          {
            uuid: '1',
            name: 'Control',
            description: 'Control description',
            createdAt: new Date('1992-06-21'),
            experimentUuid: '1',
            isControl: true,
            key: 'control',
          },
          {
            uuid: '2',
            name: 'Alternative',
            description: 'Alternative description',
            createdAt: new Date('1992-06-21'),
            experimentUuid: '1',
            isControl: false,
            key: 'alternative',
          },
          {
            uuid: '3',
            name: 'Other',
            description: 'Alternative description',
            createdAt: new Date('1992-06-21'),
            experimentUuid: '1',
            isControl: false,
            key: 'a',
          },
        ],
      },
    };
  });

  describe('resolveExperimentVariantValue', () => {
    describe('not activated', () => {
      [ExperimentStatus.INACTIVE, ExperimentStatus.NOT_ACTIVATED].forEach(
        (status) =>
          it(`always returns "undefined" when the experiment is ${status}`, () => {
            experimentEnv.status = ExperimentStatus.NOT_ACTIVATED;

            const variant = service.resolveExperimentVariantValue(
              experimentEnv,
              { id: '123' },
            );

            expect(variant.key).toEqual('control');
          }),
      );

      it('always returns "undefined" when the fields.id is not defined', () => {
        const variant = service.resolveExperimentVariantValue(
          experimentEnv,
          {},
        );

        expect(variant.key).toEqual('control');
      });
    });

    describe('activated', () => {
      it('returns the control variant over the 6666', () => {
        const variant = service.resolveExperimentVariantValue(experimentEnv, {
          id: '1',
        });

        // bucket is 9778 which is over 6666 (over 66% of the range from the ordered variant list)
        expect(variant.key).toEqual('alternative');
      });

      it('returns the alternative variant between 3333 and 6666', () => {
        const variant = service.resolveExperimentVariantValue(experimentEnv, {
          id: '10',
        });

        // bucket is 4830 which is over 3333 and below 6666
        expect(variant.key).toEqual('alternative');
      });

      it('returns the a variant when bucket is below 3333', () => {
        const variant = service.resolveExperimentVariantValue(experimentEnv, {
          id: '2',
        });

        // bucket is 2630 which is below 3333
        expect(variant.key).toEqual('a');
      });
    });
  });
});
