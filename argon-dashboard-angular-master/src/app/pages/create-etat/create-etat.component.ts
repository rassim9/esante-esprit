import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Etat } from 'src/app/models/Etat';

@Component({
  selector: 'app-create-etat',
  templateUrl: './create-etat.component.html',
  styleUrls: ['./create-etat.component.css']
})
export class CreateEtatComponent implements OnInit {

  
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form: FormGroup ;


  constructor() { }

  ngOnInit() {
    this.form = this.createFormGroup();
    }
    createFormGroup(): FormGroup {
      return new FormGroup({
        forme: new FormControl("", [Validators.required, Validators.minLength(5)]),
        description: new FormControl("", [Validators.required, Validators.minLength(5)]),
      });
    }

    onSubmit(formData : Pick<Etat, "forme" | "description">):void {
      console.log(formData);
      this.create.emit(null);
      this.form.reset();
      this.formDirective.resetForm();

    }
    

}
