import {
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { FormdataService } from '../service/formdata.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { Final } from '../interfaces/final';
import { Sample } from '../interfaces/sample';
import { Router } from '@angular/router';
interface GroupControls {
  [key: string]: [any, ValidatorFn[]];
}

@Component({
  selector: 'app-finalform',
  templateUrl: './finalform.component.html',
  styleUrls: ['./finalform.component.scss'],
})
export class FinalformComponent {
  public jsonData: Final[] = [];
  public taskForm!: FormGroup;
  public hobbiesList: string[] = [];
  public realData: Sample[] = [];
  public stateData: Sample[] = [];
  public districtData: Sample[] = [];
  public countryStates: Sample[] = [];
  public stateDistricts: Sample[] = [];
  public group: GroupControls = {};
  public countryCodes:string[]=[];
  constructor(
    private serviceRef: FormdataService,
    private fb: FormBuilder,
    private changeDetectionRef:ChangeDetectorRef,
  ) {
    this.taskForm = this.fb.group({
      // initializing  form controls
    });
    
  
  }

  ngOnInit() {
    this.getFormData();
  }
  ngAfterViewChecked(): void {
    this.changeDetectionRef.detectChanges()
  }
  public getFormData(): void {
    try {
      this.serviceRef.getFinalData().subscribe({
        next: (data) => {
          this.jsonData = data;
          const group: GroupControls = {};
          this.jsonData.forEach((control) => {
            const validators: ValidatorFn[] = [];
            //  create formarray for the checkboxes
            // let checkboxesGroup:any=this.fb.array([])
            //  const checkboxesGroup=this.fb.group({})
            if (control.validators.required) {
              validators.push(Validators.required);
            }
            if (control.validators.email) {
              validators.push(Validators.email);
            }
            if (control.validators.minlength) {
              validators.push(
                Validators.minLength(control.validators.minlength)
              );
            }
            if (control.validators.maxlength) {
              validators.push(
                Validators.maxLength(control.validators.maxlength)
              );
            }
            if (control.validators.pattren) {
              validators.push(Validators.pattern(control.validators.pattren));
            }
            //adding controlname to the   countrycode of phonenumber
            if (control.controlName === 'phonenumber') {
              const countryCodeValidators: ValidatorFn[] = [];
              if (control.countryCodes[0].validators) {
                countryCodeValidators.push(Validators.required);
              }
              group[control.countryCodes[0].controlName] = [
                '',
                countryCodeValidators,
              ];
            }

            if (control.type === 'multiselect') {
              this.hobbiesList = control.Checkboxes;
              const validators = control.validators.required;
              let validatorsAarray: ValidatorFn[] = [];
              if (validators) {
                validatorsAarray.push(Validators.required);
              }
              this.taskForm.addControl(
                control.controlName,
                new FormControl('', validatorsAarray)
              );
            }
            group[control.controlName] = ['', validators];
            this.taskForm = this.fb.group(group);
          
          });
        },
        error: (error) => console.log('error', error),
        complete: () => console.log('completed'),
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  public formSubmit(event: {
    value: {
      value(value: any): unknown; states: { statedropOptions: Sample[] }[] 
};
  },controlName:string): void {
    if(controlName==='country'){
      this.taskForm.addControl("countryName",this.fb.control(event.value.value,Validators.required))
      this.taskForm.get('countryName')?.setValue(event.value.value)
    }
    if (this.taskForm.get('state')?.value != '') {
      this.taskForm.get('state')?.reset();
      this.taskForm.get('district')?.reset();
    }
    this.countryStates = [];
    this.stateDistricts = [];
    if (event.value.states[0].statedropOptions) {
      this.countryStates = event.value.states[0].statedropOptions;
    }
    this.stateData = this.taskForm.value.country.states;
    const validators: ValidatorFn[] = [];
    this.stateData.forEach((control) => {
      if (control.validators.required) {
        validators.push(Validators.required);
      }
      this.taskForm.addControl(
        control.controlName,
        this.fb.control('', validators)
      );
      
    });
    
  }

  public forDistrict(event: {
    value: {
      value(value: any): unknown; districts: { districtdropOptions: Sample[] }[] 
};
  },controlName:string): void {

    if (event.value.districts[0].districtdropOptions) {
      this.stateDistricts = event.value.districts[0].districtdropOptions;
    }
    this.districtData =
      this.taskForm.value.country.states[0].statedropOptions[0].districts;
    const validators: ValidatorFn[] = [];
    this.districtData.forEach((data) => {
      if (data.validators.required) {
        validators.push(Validators.required);
      }
      this.taskForm.addControl(
        data.controlName,
        this.fb.control('', validators)
      );
    });
    if(controlName==='state'){
      this.taskForm.addControl("stateName",this.fb.control(event.value.value,Validators.required))
      this.taskForm.get('stateName')?.setValue(event.value.value)
    }
  }

 
  //district change
  public onDistrictChange(event:any,controlName:string):void{
    if(controlName==='district'){
      this.taskForm.addControl("districtName",this.fb.control(event.value.value,Validators.required))
      this.taskForm.get('districtName')?.setValue(event.value.value)
    }
  }
  //on gender change 
  public onGenderChange(controlName:string){
    if(controlName==='gender'){
      this.taskForm.addControl("genderType",this.fb.control(this.taskForm.value.gender.name,Validators.required))
      this.taskForm.get('genderType')?.setValue(this.taskForm.value.gender.name)
    }
  }
  

  // form submition
  public onSubmit(): void {
    let data1:any={}
    if (this.taskForm.value) {
      this.taskForm.removeControl('gender')
      const control = this.taskForm.get('country');
      const control2=this.taskForm.get('district')
      if(control){
        this.taskForm.removeControl('country')
      }
      if(control2){
        this.taskForm.removeControl('district')
      }
      this.taskForm.removeControl('state')
      console.log(this.taskForm);
      data1=this.taskForm.value;
      console.log(this.taskForm.value)
      console.log(data1)
      this.taskForm.addControl("gender",this.fb.control('',Validators.required))
      this.taskForm.addControl("country",this.fb.control('',Validators.required))
      this.taskForm.addControl("state",this.fb.control('',Validators.required))
      this.taskForm.addControl("district",this.fb.control('',Validators.required))
      this.taskForm.reset();
     
    }
  }

}
