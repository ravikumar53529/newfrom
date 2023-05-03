import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any,targetValue:string): any {
    if(!value){
      return ''
    }
   
  switch(targetValue){

    case "km":
      return value*1.60934;

    case "m":
      return value*1.60934*1000;

    case "cm":
      return value*1.60834*1000*100;

  }

  }

}
