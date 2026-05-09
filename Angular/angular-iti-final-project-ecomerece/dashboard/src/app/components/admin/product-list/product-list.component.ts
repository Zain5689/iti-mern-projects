import { Component, OnInit } from '@angular/core'; // ضيفنا OnInit هنا
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly productservices: ProductService) {}

  ngOnInit(): void {
    this.productservices.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      // If the user clicks "Yes, delete it!"
      if (result.isConfirmed) {
        this.productservices.deleteProduct(id).subscribe({
          next: () => {
            // Update the UI immediately
            this.products = this.products.filter((p) => p._id !== id);

            // Success notification
            Swal.fire({
              title: 'Deleted!',
              text: 'The product has been removed successfully.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          },
          error: (err) => {
            console.error('Delete failed:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please check your connection.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
