import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm!:FormGroup
  constructor(private service:ServiceService,private router:Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      ratings: new FormControl(''),
    });
  }

  addData():void{
    this.service.addRestaurantData(this.addForm.value)
    this.router.navigate(['/'])
  }
}
