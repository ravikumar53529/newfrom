export interface Form {

    type:string,
    controlName:string,
    label:string,
    name:string,
    validations?:Validations[],
    dropDownData?:CountryData[]
}


export interface Validations{
     required:boolean,
     requiredMessage:string
}

export interface CountryData{
    name:"string",
    code:"string"
}
