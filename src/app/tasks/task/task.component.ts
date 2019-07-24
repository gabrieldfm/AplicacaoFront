import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      Titulo: '',
      Descricao: '',
      Status: 'N'
    }
  }

  onSubmit(form:NgForm){
    if(form.value.Id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form:NgForm){
    this.service.putTask(form.value).subscribe(res => {
      this.toastr.info('Tarefa atualizada','Registro')
      this.resetForm(form);
    });
  }

  insertRecord(form:NgForm){
    this.service.postTask(form.value).subscribe(res => {
      this.toastr.success('Tarefa inserida','Registro')
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  

}
