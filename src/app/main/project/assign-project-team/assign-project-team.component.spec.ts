import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProjectTeamComponent } from './assign-project-team.component';

describe('AssignProjectTeamComponent', () => {
  let component: AssignProjectTeamComponent;
  let fixture: ComponentFixture<AssignProjectTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProjectTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProjectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
