import { Injectable } from '@angular/core';
import {Form} from '../interfaces/form'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Newform } from '../interfaces/newform';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {

public newFormData='../../assets/data/newformdata.json';

  constructor(private httpRef:HttpClient) { }

   //getNEWFORMDATA
   public getNewFormData():Observable<Newform[]>{
    return this.httpRef.get<Newform[]>(this.newFormData)
   }
}
