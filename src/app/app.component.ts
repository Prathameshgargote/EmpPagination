import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/servcies/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'EmpPagination';
  IsloaderOn!: boolean;
  constructor(private _laoservice: LoaderService) {}

  ngOnInit(): void {
    this._laoservice.loaderObs.subscribe((res) => {
      this.IsloaderOn = res;
    });
  }
}
