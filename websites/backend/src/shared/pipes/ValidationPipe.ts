import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ArraySchema, ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | ArraySchema) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    if (_metadata.type === 'body') {
      const { error } = this.schema.validate(value);

      if (error) {
        console.log('ERROR', error);
        throw new BadRequestException('Validation failed');
      }

      return value;
    }

    return value;
  }
}
