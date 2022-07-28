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
      if (value === undefined) {
        // When the object passed in validation is undefined, throw
        throw new BadRequestException('Validation failed');
      }

      const { error } = this.schema.validate(value);

      if (error) {
        throw new BadRequestException('Validation failed');
      }

      return value;
    }

    return value;
  }
}
