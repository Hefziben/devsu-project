import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.totalPages = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event on page click', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    component.onPageClick(2);
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });


  it('should not emit pageChange event when clicking on an invalid page', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    component.onPageClick(0);
    component.onPageClick(11);
    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('should emit itemsPerPageChange event on items per page change', () => {
    const itemsPerPageChangeSpy = jest.spyOn(component.itemsPerPageChange, 'emit');
    const selectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = '10';
    selectElement.dispatchEvent(new Event('change'));
    expect(itemsPerPageChangeSpy).toHaveBeenCalledWith(10);
  });
});
