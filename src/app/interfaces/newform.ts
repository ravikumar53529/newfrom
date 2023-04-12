export interface Newform {

    label:string,
    controlName:string,
    type:string,
    validators:{
        email: string
        required:boolean,
        minlength:number,
        maxlength:number,
        pattren:string
     },
    requiredMessage:string,
    lengthMessage:string,
    emailformatMessage:string,
    patternMessage:string,
     dropdownOptions? :Country [],
     genderCategories?:Gender[],
     skillsCheckboxes?:Skills[]
      
}

export interface Country{
    
    value:string, label:string
}

export interface Gender{
        name:string,
        key:string
}
export interface Skills{
    name:string,id:number,checked:boolean,key:string
}



















