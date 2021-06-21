import { PartialType } from '@nestjs/mapped-types';
import CreateVariantDto from './create-variant.dto';

export default class UpdateVariantDto extends PartialType(CreateVariantDto) {}
