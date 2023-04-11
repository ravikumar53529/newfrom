export interface Newform {

    label:string,
    name:string,
    type:string,
    validators:{
        email: string
        required:boolean,
        minlength:number,
        maxlength:number,
        pattren:string
     },
     message:string,
    message2:string,
    message3:string,
     dropdownOptions? :Country []    
      
}

export interface Country{
    
    value:string, label:string
}




















