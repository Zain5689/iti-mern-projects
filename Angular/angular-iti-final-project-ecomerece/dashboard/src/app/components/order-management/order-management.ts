import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';
@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.html',
  styleUrls: ['./order-management.css'],
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  orderStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => console.error('Error fetching orders', err),
    });
  }

  updateStatus(orderId: string, event: any) {
    const newStatus = event.target.value;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        const order = this.orders.find((o) => o._id === orderId);
        if (order) order.status = newStatus;
        console.log('Status updated to:', newStatus);
      },
      error: (err) => {
        alert('Failed to update status, check console for details');
        console.error(err);
      },
    });
  }
}
