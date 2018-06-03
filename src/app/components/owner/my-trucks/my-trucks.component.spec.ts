import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrucksComponent } from './my-trucks.component';

describe('MyTrucksComponent', () => {
  let component: MyTrucksComponent;
  let fixture: ComponentFixture<MyTrucksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrucksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
