import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  getIdOfActivedRoute(): string {
    const pathParamId = this.route.snapshot.paramMap.get('id');
    if (pathParamId === null) return ''
    else return pathParamId;
  }

  loadProduct(): void {
    const id = this.getIdOfActivedRoute();
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id = this.getIdOfActivedRoute();
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('O produto foi excluído com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
