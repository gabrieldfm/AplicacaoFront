import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Task } from '../../shared/task.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public list = new Array<Task>();
  constructor(private service: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList()
    .subscribe(data => {
      const response = (data as Array<Task>);
      
      this.list = response;
      console.log(this.list);
      
    }, error => {
      console.log(error);
      
    });;
  }

  populateForm(task: Task){
    this.service.formData = Object.assign({}, task);
  }

  onDelete(id: number){
    if(confirm('Deseja mesmo deletar esse registro?'))
      this.service.deleteTask(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Tarefa deleteada','Deletar')
      });
  }

}
