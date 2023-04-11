import { Component,OnInit } from '@angular/core';
import { FormdataService } from './service/formdata.service';
import { Form ,Validations} from './interfaces/form';
import { FormGroup,FormBuilder,FormControl, Validators, FormArray } from '@angular/forms';
import {Newform}  from './interfaces/newform';
import {ValidatorFn} from '@angular/forms';
interface GroupControls {
  [key: string]: [any, ValidatorFn[]];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public jsonData:Newform[]=[];
  public taskForm!:FormGroup
  constructor(private serviceRef:FormdataService,private fb:FormBuilder){

  }

  ngOnInit(){
    this.getFormData()
  }

  public getFormData():void{
    try{
      this.serviceRef.getNewFormData().subscribe({
        next:(data)=>{
        this.jsonData=data
      const group:GroupControls={};
      this.jsonData.forEach(control=>{
       const validators:ValidatorFn[]=[]
        if(control.validators.required){
          validators.push(Validators.required)
        }
        if(control.validators.email){
          validators.push(Validators.email)
        }
        if(control.validators.minlength){
          validators.push(Validators.minLength(control.validators.minlength))
        }
        if(control.validators.pattren){
          validators.push(Validators.pattern(control.validators.pattren))
        }
        group[control.name]=['',validators]
       })
       this.taskForm=this.fb.group(group)
        },
        error:(error)=>console.log("error",error),
        complete:()=>console.log("completed")
      })
    }catch(error){
      console.log("error",error)
    }
  }

  public onSubmit():void{
    if(this.taskForm.value){
      console.log(this.taskForm.value)
    }
    }
  
}
