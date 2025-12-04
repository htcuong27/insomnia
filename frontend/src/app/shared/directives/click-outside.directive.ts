import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        const targetElement = event.target as HTMLElement;

        // Check if the click target is outside the host element
        if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
            this.clickOutside.emit();
        }
    }
}
