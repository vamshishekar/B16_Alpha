import { Pipe, PipeTransform } from '@angular/core';
//import { resourceLimits } from 'worker_threads';

@Pipe({
  name: 'keyFilter',
})
export class KeyFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
  if (!items) return [];
  if (!searchText) return items;

  return items.filter((item) => {
    return Object.keys(item).some((key) => {
      return String(item[key])
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
  });
}
}

// transform(value:any[], filterString:string, propName:string):any[]{
//   const result:any=[];
//   if(!value || filterString ==='' || propName ===''){
//     return value;
//   }
//   value.forEach((a:any)=>{
//     if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
//       result.push(a);
//     }
//   });
//   return result;
// }

// transform(items: any[], searchText: string): any[] {
//   if (!items) return [];
//   if (!searchText) return items;

//   return items.filter((item) => {
//     return Object.keys(item).some((key) => {
//       return String(item[key])
//         .toLowerCase()
//         .includes(searchText.toLowerCase());
//     });
//   });
// }
