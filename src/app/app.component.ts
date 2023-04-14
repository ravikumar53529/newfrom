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
    this.taskForm = this.fb.group({
      // initialize your form controls here
    });
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
       const validators:ValidatorFn[]=[];
      //  create formarray for the checkboxes 
      const checkboxesGroup=this.fb.array([])
      //  const checkboxesGroup=this.fb.group({})
        if(control.validators.required){
          validators.push(Validators.required)
        }
        if(control.validators.email){
          validators.push(Validators.email)
        }
        // if(control.validators.maxlength || control.validators.minlength){
        //   if(control.validators.maxlength && control.validators.minlength){
        //     validators.push(Validators.minLength(control.validators.minlength))
        //     validators.push(Validators.maxLength(control.validators.maxlength))
        //   }else{
        //     validators.push(Validators.minLength(control.validators.minlength))
        //   }

        // }
        if(control.validators.minlength){
          validators.push(Validators.minLength(control.validators.minlength))
        }
        if(control.validators.pattren){
          validators.push(Validators.pattern(control.validators.pattren))
        }
          

        // loop through the all checkboxes and added formcontrols dynamically
        if(control.skillsCheckboxes){
          const oldcontrol=this.taskForm.get(control.controlName)
          control.skillsCheckboxes.forEach((data)=>{
            const controlNew=new FormControl(data.checked)
            checkboxesGroup.push(controlNew)
          })
             //Add checkboxgroup array to the exisiting form
         this.taskForm.addControl(control.controlName,checkboxesGroup)
         console.log(this.taskForm.value.skills)
        }else{
          group[control.controlName]=['',validators]
          this.taskForm=this.fb.group(group)
        }
        // if(control.skillsCheckboxes){
        // control.skillsCheckboxes.forEach((data)=>{
        //   checkboxesGroup.addControl(data.name,new FormControl(false))
        // })
        // this.taskForm=this.fb.group(group)
        // this.taskForm.addControl(control.controlName,checkboxesGroup)   
        // }
         
        console.log(this.taskForm.value.skills)
         
       })  
       
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
      console.log(this.taskForm)
    }
    }
  
}
