import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IData, ServiceService } from '../service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id?: string;
  editForm!: FormGroup;
  restaurantData?: IData;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      ratings: new FormControl(''),
    });

    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id')); // Get the 'id' parameter from the route
    });
    this.service.getRestaurantData().subscribe((data) => {
      this.restaurantData = data?.filter(
        (item) => item.id === Number(this.id)
      )[0];
      this.editForm.patchValue(this.restaurantData);
    });
  }

  updateData(): void {
    this.service.updateRestaurantData(this.editForm.value, Number(this.id));
    this.router.navigate(['/']);
  }
}
