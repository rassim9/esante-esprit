import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import { RdvService } from '../../services/rdv.service';
import Swal from 'sweetalert2';
import { Rdv } from 'src/app/models/Rdv';
import { title } from 'process';


@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {


  calendarOptions: CalendarOptions;
  error: any;
  rdv: Rdv;
  constructor(
    public http: HttpClient,
    private rdvService: RdvService
  ) {}

  handleDateClick(arg) {

  }

  onSelectx(event) {

  }

  ngOnInit() {
    this.getAllEvents();
  }

  deleteEvent(id) {
    this.rdvService.delete(id).subscribe((data: any) => {});
  }

  getAllEvents() {
    this.rdvService.fetchAll().subscribe((data: any) => {
      const self = this;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        selectable: false,
        editable: false,
        // dateClick: this.handleDateClick.bind(this),
        select: this.handleDateClick.bind(this),
        events: data,
        
        eventClick(evetData) {
          // tslint:disable-next-line:variable-name
          const event_id = evetData.event._def.extendedProps._id;
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            timer: 30000,
          }).then((result) => {
            if (result.value) {
              self.deleteEvent(event_id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              self.getAllEvents();
            }

          }).catch(() => {
            Swal.fire('Failed!', 'There was something went wrong.');
          });
        }
      };
    });
  }
}




  



