import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Newform,} from '../interfaces/newform';
import {Sample}  from '../interfaces/sample';
import {Final} from '../interfaces/final';
import {JsonPlaceholderData} from '../interfaces/jsonplaceholder'
@Injectable({
  providedIn: 'root'
})
export class FormdataService {

public newFormData='../../assets/data/newformdata.json';
 
public sampleNestedJson='../../assets/data/sample.json';
public finalFormData='../../assets/data/final.json';

public jsonPlaceholder='https://jsonplaceholder.typicode.com/users/'

  constructor(private httpRef:HttpClient) { }

   //getNEWFORMDATA
   public getNewFormData():Observable<Newform[]>{
    return this.httpRef.get<Newform[]>(this.newFormData)
   }

  //  nested json
  public getNestedJson():Observable<Sample[]>{
    return this.httpRef.get<Sample[]>(this.sampleNestedJson)
  }

  //get final data(final form)
  public getFinalData():Observable<Final[]>{
    return this.httpRef.get<Final[]>(this.finalFormData)

  }

  //get json placeholser 
  public getJsonPlaceholderData():Observable<JsonPlaceholderData[]>{
    return this.httpRef.get<JsonPlaceholderData[]>(this.jsonPlaceholder)
  }

  //post json placeholder data
  public postJsonPlaceholderData(object:JsonPlaceholderData,headers:{headers:any}):Observable<JsonPlaceholderData>{
    return this.httpRef.post<JsonPlaceholderData>(this.jsonPlaceholder,object,headers)
  }

  //update json placeholder data
  public updateJsonPlaceholderData(id:number,object:JsonPlaceholderData):Observable<JsonPlaceholderData>{
   return this.httpRef.put<JsonPlaceholderData>(this.jsonPlaceholder+`${id}`,object)
  }

  //delete json placeholder data

  public deleteJsonPlaceholderData(id:number):Observable<JsonPlaceholderData>{
    return  this.httpRef.delete<JsonPlaceholderData>(this.jsonPlaceholder+`${id}`)
  }


  //patch json placeholder data

  public patchJsonPlaceholderData(id:number,body:any):Observable<JsonPlaceholderData>{
    return this.httpRef.patch<JsonPlaceholderData>(this.jsonPlaceholder+`${id}`,body)
  }
}
