import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  productform = this.fb.group({
    product_name: ['', Validators.required],
    product_description: ['', Validators.required],
    product_price: ['', Validators.compose([Validators.max(500),Validators.min(1), Validators.required])]
  });
  constructor(public fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.productform.valid) {
      this.apiService.storeproduct(this.productform.value).subscribe(response => {
        console.log(response);
        alert("Product Created")
        this.productform.reset();
      });
      
    }
  }

}
