import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRNavigationBarComponent } from './hr-navigation-bar.component';

describe('HRNavigationBarComponent', () => {
  let component: HRNavigationBarComponent;
  let fixture: ComponentFixture<HRNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRNavigationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
