import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductState } from '../../../../app/store/product.store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

@Select(ProductState.showLoader) isLoading$: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {}


}
