import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavouriteArticlesComponent } from './my-favourite-articles.component';

describe('MyFavouriteArticlesComponent', () => {
  let component: MyFavouriteArticlesComponent;
  let fixture: ComponentFixture<MyFavouriteArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavouriteArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavouriteArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
