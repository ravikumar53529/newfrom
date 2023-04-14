export interface Sample{
    label:string,
    controlName:string,
    type:string,
    validators:{
        required:boolean
     },
     requiredMessage:string,
    countryDropOptions:Country[
    ]
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