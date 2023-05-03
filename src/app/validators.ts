import { AbstractControl, FormControl } from "@angular/forms";

// export function fileTypeValidator(allowedTypes:string[]){
//     return(control:FormControl):{[key:string]:any}|null=>{
//         const file = control.value;
//         if (file && allowedTypes.indexOf(file.type) === -1) {
//           return {'fileTypeNotAllowed': true};
//         } else {
//           return null;
//         }
//     }
// }


// export function fileSizeValidator(maxSize: number) {
//     return (control: FormControl): {[key: string]: any} | null => {
//       const file = control.value;
//       if (file && file.size > maxSize) {
//         return {'fileSizeExceeded': true};
//       } else {
//         return null;
//       }
//     };
//   }


   //custom validation
export function checkFileType(control: AbstractControl): { [key: string]: any } | null {
    const files: File[] = control.value;
    let errors: string[] = [];

   if (files.length >= 1 ) {
       for (let index = 0; index < files.length; index++) {
           //Use a type list here to check for your types for example "image/jpeg"
           if (files[index].type === '') {                 
               errors.push(`${files[index].name} has an invalid type of unknown\n`);
           }
       }

       return  errors.length >= 1 ? { invalid_type: errors } : null;           
   }
   return null;  // no file, can be capture by "Required" validation 
}