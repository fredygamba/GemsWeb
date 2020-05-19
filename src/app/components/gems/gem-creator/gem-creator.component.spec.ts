import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GemCreatorComponent } from './gem-creator.component';

describe('GemCreatorComponent', () => {
  let component: GemCreatorComponent;
  let fixture: ComponentFixture<GemCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GemCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
