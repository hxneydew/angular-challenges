import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [store]="store"
      [createItem]="createTeacher"
      [deleteItem]="deleteTeacher"
      [getName]="getName"
      [img]="'teacher.png'"
      customClass="bg-light-red"></app-card>
  `,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  readonly store = inject(TeacherStore);

  readonly createTeacher = () => randTeacher();
  readonly deleteTeacher = (id: number) => this.store.deleteOne(id);
  readonly getName = (teacher: Teacher) => teacher.firstName;

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
