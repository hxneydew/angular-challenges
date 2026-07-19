import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [store]="store"
      [createItem]="createCity"
      [deleteItem]="deleteCity"
      [getName]="getName"
      [img]="'city.png'"
      [customClass]="'bg-light-blue'"></app-card>
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  readonly store = inject(CityStore);

  readonly createCity = () => randomCity();
  readonly deleteCity = (id: number) => this.store.deleteOne(id);
  readonly getName = (city: City) => city.name;

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }
}
