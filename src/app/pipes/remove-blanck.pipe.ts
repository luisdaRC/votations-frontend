import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeBlanck'
})
export class RemoveBlanckPipe implements PipeTransform {

  transform(value: string): string {
    value = value.toLowerCase();
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return value.replace(/ /g, '');
  }

}
