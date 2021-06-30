import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: '<span *ngFor="let item of stars" [ngClass]="ratingIcon(item)"></span>',
  styles: ['.yellow { color: #ffa600; }'],
})
export class RatingComponent {
  @Input() public value: number = 0;
  @Input() public max: number = 10;

  public stars = new Array(this.max).fill(1).map((item, index) => item + index);

  public ratingIcon(item: number): string {
    return item <= this.value ? 'k-icon k-i-star yellow' : 'k-icon k-i-star-outline';
  }
}