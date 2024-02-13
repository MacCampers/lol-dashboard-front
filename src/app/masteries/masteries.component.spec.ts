import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteriesComponent } from './masteries.component';

describe('MasteriesComponent', () => {
  let component: MasteriesComponent;
  let fixture: ComponentFixture<MasteriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
