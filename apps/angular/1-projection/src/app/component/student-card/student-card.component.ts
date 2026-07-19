import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [store]="store"
      [createItem]="createStudent"
      [deleteItem]="deleteStudent"
      [getName]="getName"
      [img]="'student.webp'"
      customClass="bg-light-green" />
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  readonly store = inject(StudentStore);

  readonly createStudent = () => randStudent();
  readonly deleteStudent = (id: number) => this.store.deleteOne(id);
  readonly getName = (student: Student) => student.firstName;

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
