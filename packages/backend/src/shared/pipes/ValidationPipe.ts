import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    if (_metadata.type === 'body') {
      const { error } = this.schema.validate(value);

      if (error) {
        throw new BadRequestException('Validation failed');
      }

      return value;
    }

    return value;
  }
}
