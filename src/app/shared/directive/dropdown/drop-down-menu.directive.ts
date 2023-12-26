import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dropdownMenu]'
})
export class MenuDirective {
 @Output() editClick: EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output() deleteClick: EventEmitter<boolean>= new EventEmitter<any>();
  private menuOpen = false;
  private dropdown: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('click')
  onClick(): void {
    if (this.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: any): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    this.closeMenu();
    this.menuOpen = true;
    this.dropdown = this.renderer.createElement('div');
    this.renderer.addClass(this.dropdown, 'dropdown-menu');
    // ... add additional styling and elements

    const editButton = this.renderer.createElement('button');
    this.renderer.addClass(editButton, 'dropdown-item');
    this.renderer.setAttribute(editButton, 'type', 'button');
    this.renderer.appendChild(editButton, this.renderer.createText('Edit'));
    this.renderer.listen(editButton, 'click', () => this.onEditClicked());

    const deleteButton = this.renderer.createElement('button');
    this.renderer.addClass(deleteButton, 'dropdown-item');
    this.renderer.setAttribute(deleteButton, 'type', 'button');
    this.renderer.appendChild(deleteButton, this.renderer.createText('Delete'));
    this.renderer.listen(deleteButton, 'click', () => this.onDeleteClicked());

    this.renderer.appendChild(this.dropdown, editButton);
    this.renderer.appendChild(this.dropdown, deleteButton);
    this.renderer.appendChild(this.elementRef.nativeElement, this.dropdown);
  }

  private closeMenu(): void {
    if (this.menuOpen && this.dropdown) {
      this.menuOpen = false;
      this.renderer.removeChild(this.elementRef.nativeElement, this.dropdown);
      this.dropdown = null;
    }
  }

  onEditClicked() {
    this.editClick.emit(true);
  }

  onDeleteClicked() {
    this.deleteClick.emit(true);
  }
}
