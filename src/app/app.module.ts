import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobComponent } from './job/job.component';
import { PdfgenComponent } from './pdfgen/pdfgen.component';

@NgModule({
    declarations: [AppComponent, JobComponent, PdfgenComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
