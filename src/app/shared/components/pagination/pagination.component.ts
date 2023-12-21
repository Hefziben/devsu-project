import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() results: number;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  itemsPerPageOptions: number[] = [5, 10, 20];

  onPageClick(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }

  onItemsPerPageChange(event: Event): void {
    const inputValue = Number(((event.target as HTMLInputElement).value));
    this.itemsPerPageChange.emit(inputValue);
  }
}
