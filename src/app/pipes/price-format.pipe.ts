import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone:true
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (typeof value !== 'number') {
      return value;
    }

    return (value / 100).toFixed(2);

  }

}
