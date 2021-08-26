import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaboraterComponent } from './add-collaborater.component';

describe('AddCollaboraterComponent', () => {
  let component: AddCollaboraterComponent;
  let fixture: ComponentFixture<AddCollaboraterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollaboraterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
