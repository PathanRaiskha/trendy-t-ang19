import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartListComponent } from './show-cart-list.component';

describe('ShowCartListComponent', () => {
  let component: ShowCartListComponent;
  let fixture: ComponentFixture<ShowCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCartListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
