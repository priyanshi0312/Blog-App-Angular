import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatArticleComponent } from './updat-article.component';

describe('UpdatArticleComponent', () => {
  let component: UpdatArticleComponent;
  let fixture: ComponentFixture<UpdatArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
