import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";

@Component({
  selector: 'app-pagination',
  template: `
    <nav aria-label="Page navigation" *ngIf="totalItems > pageSize">
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage == 1">
          <a class="page-link" (click)="previous()" aria-label="previous">&laquo;</a>
        </li>
        <li class="page-item" [class.active]="currentPage == page" *ngFor="let page of pages">
          <a class="page-link" (click)="changePage(page)">{{page}}</a>
        </li>
        <li class="page-item" [class.disabled]="currentPage == pages.length">
          <a class="page-link" (click)="next()" aria-label="Next">&raquo;</a>
        </li>
      </ul>
    </nav>
  `
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') totalItems;
  @Input('page-size') pageSize = 10;
  @Output('page-changed') pageChanged = new EventEmitter();
  pages: any[];
  currentPage = 1;

  ngOnChanges(): void {
    this.currentPage = 1;

    let pageCount = Math.ceil(this.totalItems / this.pageSize)
    this.pages = [];
    for (let i = 1; i <= pageCount; i++)
      this.pages.push(i);
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    if (this.currentPage == 1)
      return;

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage == this.pages.length)
      return;

    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }
}
