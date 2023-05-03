import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SampleComponent } from './sample/sample.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PipesComponent } from './pipes/pipes.component';
import { TransformPipe } from './transform.pipe';
import { FinalformComponent } from './finalform/finalform.component';
import { InterceptorsComponent } from './interceptors/interceptors.component';
import { JsoninterceptorInterceptor } from './jsoninterceptor.interceptor';
import {TableModule}  from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { FilesizeComponent } from './filesize/filesize.component';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    PipesComponent,
    TransformPipe,
    FinalformComponent,
    InterceptorsComponent,
    FilesizeComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    TableModule,
    InputTextModule,
    DialogModule,
    MessagesModule,
    CardModule
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JsoninterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
