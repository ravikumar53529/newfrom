export interface Final{
    label:string,
    controlName:string,
    type:string,
    validators:{
        email: any
        required:boolean,
        minlength:number,
        maxlength:number,
        pattren:string
     },
     placeholder:string
     requiredMessage:string,
     minLengthMessage:string,
     patternMessage:string,
     maxLengthMessage:string,
     emailformatMessage:string,
     Checkboxes:string[]
     genderCategories:Gender[],
     countryDropOptions:Country[
    ],
    countryCodes:CoutryCodes[]
    
}


export interface Gender{
    name:string,
    key:string
}
export interface Country{
    value: string,
    label: string,
    states:State[],
    
}

export  interface State{
    label:string,
    controlName:string,
    type:string,
    validators:{
        required:boolean,
     },
     
     requiredMessage:string,
     minLengthMessage:string,
    stateDropOptions:StateDropDown[]
}
export interface StateDropDown{
    value:string,
    label:string,
    districts:District[],
    countryId:string,
}
export interface District{
    label:string,
    controlName: string,
    type: string,
    validators:{
        required:boolean
     },
     requiredMessage:string
    districtdropOptions:DistrictDropDown[]
}

export interface DistrictDropDown{
    
      value:string,
      label:string
    
}
export interface Skills{
    name:string,id:number,checked:boolean,key:string
}
export interface CoutryCodes{
    label:string
    controlName:string
    type:string
    countryCodesDropDown:String[],
    validators:{
        required:boolean
     },
     requiredMessage:string
}
export interface Codes{
    value:string,
    code:string
}