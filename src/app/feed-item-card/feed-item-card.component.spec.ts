import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemCardComponent } from './feed-item-card.component';

describe('FeedItemCardComponent', () => {
  let component: FeedItemCardComponent;
  let fixture: ComponentFixture<FeedItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
