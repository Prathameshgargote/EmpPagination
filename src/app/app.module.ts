import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './shared/componants/table/table.component';
import { FormComponent } from './shared/componants/form/form.component';
import { GetconfirmComponent } from './shared/componants/getconfirm/getconfirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { InterceptorInterceptor } from './shared/servcies/interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    GetconfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: InterceptorInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
