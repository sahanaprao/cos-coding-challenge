import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsDetailsComponent } from './auctions-details.component';

describe('AuctionsDetailsComponent', () => {
  let component: AuctionsDetailsComponent;
  let fixture: ComponentFixture<AuctionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
