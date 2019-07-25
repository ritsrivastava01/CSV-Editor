import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformFileName'
})
export class TransformFileNamePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const values = value.split('\\\\');
    console.log(values);

    return null;
  }
}
