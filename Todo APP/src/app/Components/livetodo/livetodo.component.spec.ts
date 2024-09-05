import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetodoComponent } from './livetodo.component';

describe('LivetodoComponent', () => {
  let component: LivetodoComponent;
  let fixture: ComponentFixture<LivetodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivetodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivetodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
