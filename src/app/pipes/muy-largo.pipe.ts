import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'muyLargo'
})
export class MuyLargoPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 40){
      value =  value.substring(0,65);
      return value+='....'
    }else{
      return value
    }
  }

}
