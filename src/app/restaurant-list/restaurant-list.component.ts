import { Component, OnInit } from '@angular/core';
import data from '../../assets/data/restaurant.json';
import { IData, ServiceService } from '../service.service';



@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurantData?:IData[]

  constructor(private service:ServiceService) { 
    this.service.getRestaurantData().subscribe((data) => {
      this.restaurantData = data;
    });
  }

  ngOnInit(): void {
    
  }

  /**
   * delete restaurant data
   * @param id store restaurant id
   */
  deleteRestaurant(id:number){
    this.service.deleteRestaurantData(id)
  }

}
