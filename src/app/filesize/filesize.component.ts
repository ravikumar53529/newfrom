import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkFileType } from '../validators';
interface FileObject{
  name:string,
  type:string,
  size:number,
  lastModified:number,
  lastModifiedDate:Date
}
@Component({
  selector: 'app-filesize',
  templateUrl: './filesize.component.html',
  styleUrls: ['./filesize.component.scss']
})
export class FilesizeComponent {
  public allowedTypes:string[] = ['image/jpeg', 'image/png', 'video/mp4'];
  public fileForm!:FormGroup
  constructor(private fb:FormBuilder){
  this.fileForm=this.fb.group({
     file1:new FormControl('', [checkFileType])
    })
  }


  ngOnInit(){
  }

  public onFileSubmit():void{
    // console.log(this.fileForm.value)
    const selectedFile=this.fileForm.controls['file1'];
    console.log(selectedFile)
  }
  get fileInput() {
    return this.fileForm.get('file1');
  }
  public onFileSelect(event:Event):void{
    const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0] as unknown as FileObject;
  console.log(file.size)
  console.log(file.type)
  console.log(file.lastModified)
  console.log(file.lastModifiedDate)
  }
}
