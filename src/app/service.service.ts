import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IData {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
  ratings: number;
  images: string[];
  menu: {
    item: string;
    description: string;
    price: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  restaurant:IData[] = JSON.parse(String(localStorage.getItem('restaurants')))
  public restaurantData = new BehaviorSubject<IData[]>(this.restaurant);

  constructor() {
    this.restaurant=this.restaurant?this.restaurant:[]
  }

  getRestaurantData() {
    return this.restaurantData.asObservable();
  }

  /**
   * add restaurant data
   * @param data store restaurant data
   */
  addRestaurantData(data: IData):void {
    data.id = this.restaurant.length;
    this.restaurant.push(data);
    this.updateLocalStorage();
  }

  /**
   * update restaurant data
   * @param data updated data
   * @param id restaurant id
   */
  updateRestaurantData(data: IData, id: number):void {
    const index = this.restaurant.findIndex((data) => data.id === id);
    this.restaurant[index] = data;
    this.restaurant[index].id=id
    this.updateLocalStorage();
  }

  /**
   * delete restaurant data
   * @param id store restaurant id
   */
  deleteRestaurantData(id: number) :void{
    const index = this.restaurant.findIndex((data) => data.id === id);
    this.restaurant.splice(index, 1);
    this.updateLocalStorage();
  }

  /**
   * update local storage
   */
  private updateLocalStorage(): void {
    localStorage.setItem('restaurants', JSON.stringify(this.restaurant));
    this.restaurantData.next(this.restaurant)
    this.restaurant=JSON.parse(String(localStorage.getItem('restaurants')))
  }
}
