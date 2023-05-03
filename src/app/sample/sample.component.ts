import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormdataService } from '../service/formdata.service';
import { Sample } from '../interfaces/sample';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { state } from '@angular/animations';
interface GroupControls {
  [key: string]: [any, ValidatorFn[]];
}
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements AfterViewChecked {
  public realData:Sample[]=[]
  public stateData:Sample[]=[];
   districtData:Sample[]=[]
  Cstates:Sample[]=[];
  Distics:Sample[]=[]
  public group:GroupControls={};
  taskForm!:FormGroup
  constructor(private serviceRef:FormdataService,private fb:FormBuilder,private cdr:ChangeDetectorRef){
    this.taskForm = this.fb.group({
      // initialize your form controls here
    });
  }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges()
  }
  ngOnInit(){
   this.serviceRef.getNestedJson().subscribe((data)=>{
    this.realData=data
    this.realData.forEach((control)=>{
      const validators:ValidatorFn[]=[];
      if(control.validators.required){
        validators.push(Validators.required)
      }
      this.group[control.controlName]=['',validators]
      this.taskForm=this.fb.group(this.group)
    })
     console.log(this.taskForm.value)
   })
  }

  public  formSubmit():void{
    console.log(this.taskForm.value.country.states[0].statedropOptions)
    this.Cstates=this.taskForm.value.country.states[0].statedropOptions
    this.stateData=this.taskForm.value.country.states
    const validators:ValidatorFn[]=[];
      this.stateData.forEach((control)=>{
        if(control.validators.required){
          validators.push(Validators.required)
        }
        this.taskForm.addControl(control.controlName,this.fb.control('',validators))
       })
    console.log(this.taskForm.value)
  }

  public forDistrict(event: { value: { districts: { districtdropOptions: Sample[]; }[]; }; }):void{
    // console.log(event.value.districts[0].districtdropOptions)
  
    if(event.value.districts[0].districtdropOptions){
      this.Distics=event.value.districts[0].districtdropOptions
    }
   this.districtData=this.taskForm.value.country.states[0].statedropOptions[0].districts
   const validators:ValidatorFn[]=[];
   this.districtData.forEach((data)=>{
  if(data.validators.required){
    validators.push(Validators.required)
  }
  console.log(this.taskForm)
    this.taskForm.addControl(data.controlName,this.fb.control('',validators))
   })
  }


  public onSubmit():void{
  console.log(this.taskForm)
  }
}
