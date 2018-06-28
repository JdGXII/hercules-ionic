import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    {title: 'Menu Principal', pushPage: 'MenuPage'},
    {title: 'Cuenta', pushPage: 'AccountPage'},
    {title: 'Acerca de nosotros', pushPage: 'AboutPage'},
    {title: 'Tipos de trabajos', pushPage: 'WorksPage'}
  ];
  constructor(public navCtrl: NavController) {

  }

}
