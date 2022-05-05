import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesDetailsComponent } from './milestones-details.component';

describe('MilestonesDetailsComponent', () => {
  let component: MilestonesDetailsComponent;
  let fixture: ComponentFixture<MilestonesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestonesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
