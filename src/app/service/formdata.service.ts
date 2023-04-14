import { Injectable } from '@angular/core';
import {Form} from '../interfaces/form'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Newform,} from '../interfaces/newform';
import {Sample}  from '../interfaces/sample'
@Injectable({
  providedIn: 'root'
})
export class FormdataService {

public newFormData='../../assets/data/newformdata.json';
 
public sampleNestedJson='../../assets/data/sample.json'
  constructor(private httpRef:HttpClient) { }

   //getNEWFORMDATA
   public getNewFormData():Observable<Newform[]>{
    return this.httpRef.get<Newform[]>(this.newFormData)
   }

  //  nested json
  public getNestedJson():Observable<Sample[]>{
    return this.httpRef.get<Sample[]>(this.sampleNestedJson)
  }
}
