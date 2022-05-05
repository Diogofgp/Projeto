import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesItemComponent } from './milestones-item.component';

describe('MilestonesItemComponent', () => {
  let component: MilestonesItemComponent;
  let fixture: ComponentFixture<MilestonesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestonesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
