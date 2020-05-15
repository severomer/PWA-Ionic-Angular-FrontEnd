import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdetailPage } from './edetail.page';

describe('EdetailPage', () => {
  let component: EdetailPage;
  let fixture: ComponentFixture<EdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
