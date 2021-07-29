import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConstructorsComponent } from './current-constructors.component';

describe('CurrentConstructorsComponent', () => {
  let component: CurrentConstructorsComponent;
  let fixture: ComponentFixture<CurrentConstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentConstructorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
