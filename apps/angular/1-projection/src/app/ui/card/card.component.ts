import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

export interface Store<T> {
  addOne(item: T): void;
}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="imgSrc()" width="200" height="200" alt="" />

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="getName()(item)"
            [id]="item.id"
            [delete]="deleteItem()"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage],
  styleUrls: ['./card.css'],
})
export class CardComponent<T> {
  readonly list = input<any[] | null>(null);
  readonly store = input.required<Store<T>>();
  readonly createItem = input.required<() => T>();
  readonly deleteItem = input.required<(id: number) => void>();
  readonly getName = input.required<(item: T) => string>();
  readonly img = input.required<string>();
  readonly customClass = input('');

  readonly imgSrc = computed(() => `assets/img/${this.img()}`);

  addNewItem() {
    this.store().addOne(this.createItem()());
  }
}
