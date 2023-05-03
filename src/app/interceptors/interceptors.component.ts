import { Component ,OnInit} from '@angular/core';
import { FormdataService } from '../service/formdata.service';
import {JsonPlaceholderData} from  '../interfaces/jsonplaceholder';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-interceptors',
  templateUrl: './interceptors.component.html',
  styleUrls: ['./interceptors.component.scss']
})
export class InterceptorsComponent {
public jsonData:JsonPlaceholderData[]=[]
public addDialogStatus:boolean=false;
public updateDialogStatus:boolean=false;
public updateId:number=0
public message:Message[]=[]
public errorMessage:Message[]=[]
public eachUserData:JsonPlaceholderData={
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
}
public payload:JsonPlaceholderData={
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
}
addDetailsForm!:FormGroup
updateDetailsForm!: FormGroup;
 constructor(private serviceRef:FormdataService,private fb:FormBuilder){
  this.addDetailsForm=this.fb.group({});
  this.updateDetailsForm=this.fb.group({})
 }
 
 ngOnInit(){
  this.getJsonData();
  this.onAddDetailsForm();
  this.onUpdateDetailsForm()
 }

 //getting json data
 public getJsonData():void{
  this.serviceRef.getJsonPlaceholderData().subscribe((data)=>{
   this.jsonData=data
   this.jsonData.map((data)=>{
    console.log(data)
   })
  })
 }

// add dialogBox
 public showAddDialog(){
  this.addDialogStatus=true
 }

 public showUpdateDialog(id:number,data:JsonPlaceholderData){
  this.updateDialogStatus=true
  console.log(id)
  this.updateId=id;
  this.jsonData.filter((data)=>{
  if((data.id)===id){
    this.eachUserData=data
  }
  
  })
  console.log(this.eachUserData)
  this.updateDetailsForm=this.fb.group({
    username:new FormControl(data.username),
    name:new FormControl(data.name),
    email:new FormControl(data.email),
    website:new FormControl(data.website),
    phonenumber:new FormControl(data.phone),
    address:this.fb.group({
      street:new FormControl(data.address.street),
      suite:new FormControl(data.address.suite),
      city:new FormControl(data.address.city),
      zipcode:new FormControl(data.address.zipcode),
      geo:this.fb.group({
        latitude:new FormControl(data.address.geo.lat),
        longitude:new FormControl(data.address.geo.lng)
      })
    }),
    company:this.fb.group({
      name:new FormControl(data.company.name),
      catchphrase:new FormControl(data.company.catchPhrase),
      fb:new FormControl(data.company.bs)
    })
  })
 }

 public onAddDetailsForm():void{
  this.addDetailsForm=this.fb.group({
    username:new FormControl(),
    name:new FormControl(),
    email:new FormControl(),
    website:new FormControl(),
    phonenumber:new FormControl(),
    address:this.fb.group({
      street:new FormControl(),
      suite:new FormControl(),
      city:new FormControl(),
      zipcode:new FormControl(),
      geo:this.fb.group({
        latitude:new FormControl(),
        longitude:new FormControl()
      })
    }),
    
    company:this.fb.group({
      name:new FormControl(),
      catchphrase:new FormControl(),
      fb:new FormControl()
    })
  })

 
 }

 public onAddDetailsSubmit():void{
  console.log(this.addDetailsForm.value)
  this.payload={
    name:this.addDetailsForm.value.name,
    username:this.addDetailsForm.value.username,
    email:this.addDetailsForm.value.email,
    address:{
      street:this.addDetailsForm.value.address.street,
    suite:this.addDetailsForm.value.address.suite,
    city:this.addDetailsForm.value.address.city,
    zipcode:this.addDetailsForm.value.address.zipcode,
    geo:{
        lat:this.addDetailsForm.value.address.geo.lat,
        lng:this.addDetailsForm.value.address.geo.lng
    }
    },
    phone:this.addDetailsForm.value.phonenumber,
    website:this.addDetailsForm.value.website,
    company:{
        name:this.addDetailsForm.value.company.name,
        catchPhrase:this.addDetailsForm.value.company.catchphrase,
        bs:this.addDetailsForm.value.company.fb
    }
    

  }
  console.log(this.payload)
  const headers1=new HttpHeaders({
    contentType:'application/json'
  })
  //adding details
  this.serviceRef.postJsonPlaceholderData(this.payload,{headers:headers1}).subscribe((data)=>{
    console.log(data)
    this.showToastMessages()
  })
  console.log(this.addDetailsForm.value.name)
 }

 public onUpdateDetailsForm():void{
  this.updateDetailsForm=this.fb.group({
    username:new FormControl(),
    name:new FormControl(),
    email:new FormControl(),
    website:new FormControl(),
    phonenumber:new FormControl(),
    address:this.fb.group({
      street:new FormControl(),
      suite:new FormControl(),
      city:new FormControl(),
      zipcode:new FormControl(),
      geo:this.fb.group({
        latitude:new FormControl(),
        longitude:new FormControl()
      })
    }),
    
    company:this.fb.group({
      name:new FormControl(),
      catchphrase:new FormControl(),
      fb:new FormControl()
    })
  })
 }
 public onUpdateFormSubmit():void{
  console.log(this.updateDetailsForm.value)
  this.payload={
    name:this.updateDetailsForm.value.name,
    username:this.updateDetailsForm.value.username,
    email:this.updateDetailsForm.value.email,
    address:{
      street:this.updateDetailsForm.value.address.street,
    suite:this.updateDetailsForm.value.address.suite,
    city:this.updateDetailsForm.value.address.city,
    zipcode:this.updateDetailsForm.value.address.zipcode,
    geo:{
        lat:this.updateDetailsForm.value.address.geo.latitude,
        lng:this.updateDetailsForm.value.address.geo.longitude
    }
    },
    phone:this.updateDetailsForm.value.phonenumber,
    website:this.updateDetailsForm.value.website,
    company:{
        name:this.updateDetailsForm.value.company.name,
        catchPhrase:this.updateDetailsForm.value.company.catchphrase,
        bs:this.updateDetailsForm.value.company.fb
    }
  }
  console.log(this.payload)
  console.log(this.updateId)
  this.serviceRef.updateJsonPlaceholderData(this.updateId,this.payload).subscribe((data)=>{
    console.log(data)
    console.log(data)
  
    
  })
  this.updateDialogStatus=false
  this.showToastMessages()
 }

 public onDelete(id:number):void{
  console.log(id)
  this.showErrorToastMessages()
  try{
    this.serviceRef.deleteJsonPlaceholderData(id).subscribe((data)=>{
      console.log(data)
     })
  }catch{
 
  }
 
 }
 public patchValue(id:number,body:JsonPlaceholderData):void{

  const obj={
    name:"ravikumargalinki",
    email:"ravikumar.g@gmail.com",
    username:"ravi53529"
  }

  this.serviceRef.patchJsonPlaceholderData(id,obj).subscribe((data)=>{
    console.log(data)
  })

 }

 public showToastMessages():void{
  this.message = [{ severity: 'success', summary: 'Success', detail: 'Updated content successfully' }];
 }
 public showErrorToastMessages():void{
 this.errorMessage=[ { severity: 'error', summary: 'Error', detail: 'Data  Deleted successfully' }]
 }
}
