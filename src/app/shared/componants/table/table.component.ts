import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
('@angular/common');
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeService } from '../../servcies/employe.service';
import { SnackbarService } from '../../servcies/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FormComponent } from '../form/form.component';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'fname',
    'lname',
    'Email',
    'DOB',
    'Contact',
    'Education',
    'Experince',
    'Company',
    'gender',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;
  EmployeArr!: any[];
  EDitObj!: any;
  EditID!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _empservice: EmployeService,
    private _matdailog: MatDialog,
    private _snackbar: SnackbarService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata() {
    this._empservice.fetchAlldata().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.EmployeArr = res;
        this.dataSource = new MatTableDataSource(this.EmployeArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddEmpolyee() {
    let matdailogref = this._matdailog.open(FormComponent, {
      width: '60%',
      disableClose: true,
    });
    matdailogref.afterClosed().subscribe((res) => {
      if (res) {
        this.dataSource.data = [...this.dataSource.data, res];
      }
    });
  }

  onedit(row: any) {
    let matdailogref = this._matdailog.open(FormComponent, {
      width: '60%',
      data: row,
    });
    matdailogref.afterClosed().subscribe((res) => {
      if (res) {
        let index = this.EmployeArr.findIndex((itme) => itme.Id == row.Id);
        this.EmployeArr[index] = res;
        this.dataSource.data = [...this.EmployeArr];
      }
    });
  }

  Onremove(row: any) {
    let matdailogref = this._matdailog.open(GetconfirmComponent, {
      width: '60%',
    });
    matdailogref.afterClosed().subscribe((res) => {
      if (res) {
        this._empservice.RemoveEmp(row).subscribe((res) => {
          let index = this.EmployeArr.findIndex((itme) => itme.Id == row.Id);
          this.EmployeArr.splice(index, 1);
          this._snackbar.opensnackbar(
            `the ${row.fname} is Remove Successfully ...!`
          );
          this.dataSource.data = [...this.EmployeArr];
        });
      }
    });
  }
}
