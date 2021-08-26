import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollaboratersComponent } from './list-collaboraters.component';

describe('ListCollaboratersComponent', () => {
  let component: ListCollaboratersComponent;
  let fixture: ComponentFixture<ListCollaboratersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCollaboratersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCollaboratersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
