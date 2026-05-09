import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-product',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  selectedFile: File | null = null;
  editForm!: FormGroup;
  productId!: string;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private productSer: ProductService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.productId = this.route.snapshot.params['id'];
    this.loadCategories();
    this.loadProduct();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  initForm() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      imageCover: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  loadProduct() {
    this.productSer.getProductById(this.productId).subscribe({
      next: (res) => {
        this.editForm.get('title')?.setValue(res.data.title);
        this.editForm.get('price')?.setValue(res.data.price);
        this.editForm.get('description')?.setValue(res.data.description);
        this.editForm.get('quantity')?.setValue(res.data.quantity);
        this.editForm.get('imageCover')?.setValue(res.data.imageCover);
        this.editForm.get('category')?.setValue(res.data.category._id);
      },
    });
  }

  loadCategories() {
    this.productSer.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log('Categories loaded successfully');
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });
  }
  // loadProduct() {
  //   this.productSer.getProductById(this.productId).subscribe({
  //     next: (res) => {

  //       this.editForm.patchValue(res.data || res);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  onUpdate() {
    if (this.editForm.valid) {
      const formData = new FormData();

      formData.append('title', this.editForm.get('title')?.value);
      formData.append('description', this.editForm.get('description')?.value);
      formData.append('price', this.editForm.get('price')?.value);
      formData.append('quantity', this.editForm.get('quantity')?.value);
      formData.append('category', this.editForm.get('category')?.value);
      if (this.selectedFile) {
        formData.append('imageCover', this.selectedFile);
      }

      this.productSer.updateProduct(this.productId, formData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Product updated successfully',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Update failed, please try again',
            icon: 'error',
          });
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
