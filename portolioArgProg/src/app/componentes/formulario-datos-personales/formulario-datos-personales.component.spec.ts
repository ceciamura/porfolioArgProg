import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDatosPersonalesComponent } from './formulario-datos-personales.component';

describe('FormularioDatosPersonalesComponent', () => {
  let component: FormularioDatosPersonalesComponent;
  let fixture: ComponentFixture<FormularioDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDatosPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
