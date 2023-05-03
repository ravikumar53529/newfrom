import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormdataService } from '../service/formdata.service';
interface City{
  name:string,
  label:string
}
@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {
   public hobbies:City[]=[]
  cars={
    name:"ravikumar",
    role:"Angular Developer",
    place:"Hyderbad"
  }
  myForm!:FormGroup
  constructor(private fb:FormBuilder,private serviceRef:FormdataService){
   
  }

  ngOnInit(){

    this.serviceRef.getFinalData().subscribe((data)=>{
      console.log("hello")
      console.log(data)
    })
    
    this.hobbies=[
      {name:"cricket",label:"crckt"},
      {name:"Hockey",label:"hcy"},
      {name:'Tennis',label:"tns"}
    ]
    this.myForm=this.fb.group({
      // firstname:new FormControl('',[Validators.required])
    })
    this.myForm.addControl("firstname",new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]))
    this.myForm.addControl("phonenumber",new FormControl('',[Validators.required,Validators.maxLength(10)]))
    this.myForm.addControl("date",new FormControl('',Validators.required))
    this.myForm.addControl("price",new FormControl('',[Validators.required]))
    this.myForm.addControl("height",new FormControl('',Validators.required))
    this.myForm.addControl("miles",new FormControl('',[Validators.required]))
    this.myForm.addControl("selectedHobbies",new FormControl('',Validators.required))
 
    
    
    this.myForm.valueChanges.subscribe(val => console.log(val));
  }
  public onSubmit():void{
    console.log(this.myForm)
  }
}
