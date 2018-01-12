import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Number, currency?: String): String {
    currency = currency !== undefined ? currency : '€';
    return value.toFixed(2).replace('.', ',') + ' ' + currency;
  }
}
