import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent implements OnInit {

  constructor(
    private _matdailogref:MatDialogRef<GetconfirmComponent>
  ) { }

  ngOnInit(): void {
  }

OnRemopve(flag:boolean){
this._matdailogref.close(flag)
}

}
