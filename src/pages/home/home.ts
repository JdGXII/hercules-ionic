import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase/app';

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

  logPage: any;
  loggedIn: any;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
              public userService: UserServiceProvider) {
    this.logPage = 'LoginPage';

    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.loggedIn = user.email;
      }
    })

  }

  logOut(){
    this.userService.logOut();
    this.loggedIn = '';
  }

}
