import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDescriptorComponent } from './view-descriptor.component';

describe('ViewDescriptorComponent', () => {
  let component: ViewDescriptorComponent;
  let fixture: ComponentFixture<ViewDescriptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDescriptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
