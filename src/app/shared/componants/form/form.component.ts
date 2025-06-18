import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Serializer } from '@angular/compiler';
import { EmployeService } from '../../servcies/employe.service';
import { SnackbarService } from '../../servcies/snackbar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  empForm!: FormGroup;
  userForm: any;
  editobj!: any;
  EditId!: string;
  IsEditMode: boolean = false;
  constructor(
    private _sanckbar:SnackbarService,
    private _tableservice:EmployeService,
    private _matdailogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(this.data);
  }

  ngOnInit(): void {
    this.certerform();
    this.pathcvalueObj();
  }

  certerform() {
    this.empForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      DOB: new FormControl(null, [Validators.required]),
      contact: new FormControl(null, [Validators.required,Validators.pattern('^[6-9]\\d{9}$')]),
      education: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.IsEditMode) {
        let updateObj = {
          ...this.empForm.value,
          DOB: new Date(this.empForm.value.DOB).toISOString(),
          Id: this.editobj.Id,
        };
        console.log(updateObj);
        this._tableservice.updateEmp(updateObj).subscribe((res) => {
          this._matdailogRef.close(updateObj);
          this._sanckbar.opensnackbar(`The ${updateObj.fname} is Update Succussfully...!`)
          this.IsEditMode = false;
        });
      } else {
        // console.log({
        //   ...this.empForm.value,
        //   DOB: this.empForm.value.DOB.toISOString(),
        // });
        let newObj = {
          ...this.empForm.value,
          DOB: this.empForm.value.DOB.toISOString(),
        };
        this._tableservice.AddEmplyee(newObj).subscribe(res=>{
          this._matdailogRef.close({ ...newObj, id: res.name })
          this._sanckbar.opensnackbar(`The ${newObj.fname} is Added Succussfully...!`)

        })
      }
    }
  }

  pathcvalueObj() {
    // this.EditId=this.data
    this.editobj = this.data;
    console.log(this.data);
    if (this.editobj) {
      this.IsEditMode = true;
      this.empForm.patchValue(this.editobj);
    }
  }

  onclick(){
    this._matdailogRef.close()
  }


  get f(){
    return this.empForm.controls
  }
}
