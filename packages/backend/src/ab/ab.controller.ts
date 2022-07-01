import { Controller } from '@nestjs/common';
import { AbService } from './ab.service';

@Controller()
export class AbController {
  constructor(private readonly abService: AbService) {}
}
