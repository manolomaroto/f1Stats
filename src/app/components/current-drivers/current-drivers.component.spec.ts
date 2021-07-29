import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDriversComponent } from './current-drivers.component';

describe('CurrentDriversComponent', () => {
  let component: CurrentDriversComponent;
  let fixture: ComponentFixture<CurrentDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
