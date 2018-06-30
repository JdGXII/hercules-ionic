import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    {title: 'Menu Principal', pic: '../assets/imgs/uha-all-hands-in-1.jpg', pushPage: 'MenuPage'},
    {title: 'Cuenta', pic: '../assets/imgs/uha-all-hands-in-1.jpg', pushPage: 'AccountPage'},
    {title: 'Acerca de nosotros', pic: '../assets/imgs/uha-all-hands-in-1.jpg', pushPage: 'AboutPage'},
    {title: 'Tipos de trabajos', pic: '../assets/imgs/uha-all-hands-in-1.jpg', pushPage: 'WorksPage'}
  ];
  constructor(public navCtrl: NavController) {

  }

}
