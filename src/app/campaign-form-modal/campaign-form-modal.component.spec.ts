import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFormModalComponent } from './campaign-form-modal.component';

describe('CampaignFormModalComponent', () => {
  let component: CampaignFormModalComponent;
  let fixture: ComponentFixture<CampaignFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
