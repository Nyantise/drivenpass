import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseParamPipe implements PipeTransform<string, number> {

  transform(value: string, metadata: ArgumentMetadata): number {
    const parsedParam = Number(value);

    if (!value) {
      throw new BadRequestException(`Invalid param value: undefined.`)
    };

    if (isNaN(parsedParam)) {
      throw new BadRequestException(`Invalid param type: Not a number, it needs to be an integer`);
    }

    if (!Number.isInteger(parsedParam)){
      throw new BadRequestException(`Invalid param type: Float, it needs to be an integer`);
    }

    if(parsedParam < 1){
      throw new BadRequestException(`Invalid param value: ${parsedParam}, it needs to be greater than 0`)
    }

    return parsedParam
  }
}