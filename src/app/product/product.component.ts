import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
// import { ApihandlerService } from 'src/app/shared/apihandler.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns = ['id', 'product_name', 'product_description', 'product_price'];
  dataSource = new MatTableDataSource();
  datalist = [];
  showClearBtn = false;
  @Input() id: ActivatedRoute

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  form: FormGroup = new FormGroup({});

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = fb.group({
      p0to50: [false],
      p50to100: [false],
      p100to500: [false]
    })
  }

  ngOnInit(): void {

    this.getproduct();

  }

  getproduct() {
    this.apiService.getproduct().subscribe(response => {
      console.log(response);
      this.datalist = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // get f() {
  //   return this.form.controls;
  // }

  

  filter() {

    console.log(this.form.value);
    this.apiService.getfilterproduct(this.form.value).subscribe(response => {
      console.log(response);
      this.datalist = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    if(this.form.value.p0to50 || this.form.value.p50to100 || this.form.value.p100to500){
      this.showClearBtn = true;
    } else {
      this.showClearBtn = false;
    }
  }

  clearfilter() {
    this.form = this.fb.group({
      p0to50: [false],
      p50to100: [false],
      p100to500: [false],
    })
    this.getproduct();

    this.showClearBtn = false;
  }
}
