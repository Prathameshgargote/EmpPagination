import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private MAtsnackbar: MatSnackBar) {}

  opensnackbar(msg: string) {
    this.MAtsnackbar.open(msg, 'close', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}
