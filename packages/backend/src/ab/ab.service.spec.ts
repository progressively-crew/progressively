import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
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
        key: 'firstExperiment',
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

            const variantKey = service.resolveExperimentVariantValue(
              experimentEnv,
              { id: '123' },
            );

            expect(variantKey).toEqual('control');
          }),
      );

      it('always returns "undefined" when the fields.id is not defined', () => {
        const variantKey = service.resolveExperimentVariantValue(
          experimentEnv,
          {},
        );

        expect(variantKey).toEqual('control');
      });
    });

    describe('activated', () => {
      it('returns the alternative variant when targeting it', () => {
        const variantKey = service.resolveExperimentVariantValue(
          experimentEnv,
          { id: '1' },
        );

        expect(variantKey).toEqual('alternative');
      });

      it('returns the control variant when targeting it', () => {
        const variantKey = service.resolveExperimentVariantValue(
          experimentEnv,
          { id: '2' },
        );

        expect(variantKey).toEqual('control');
      });
    });
  });
});
