import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfigDescriptorsComponent } from './list-config-descriptors.component';

describe('ListConfigDescriptorsComponent', () => {
  let component: ListConfigDescriptorsComponent;
  let fixture: ComponentFixture<ListConfigDescriptorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConfigDescriptorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConfigDescriptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
