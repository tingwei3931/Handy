import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams} from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupPage } from '../pages';
import { ForgotPasswordPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [User]
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: "",
    password: ""
  };
  private usersList: any;
  private users = [];
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public modalCtrl: ModalController,
    public navParams: NavParams ) {
    this.listUsers();
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  //tutorial for API request
  listUsers(){
    this.user.loadUser(10)
    .then(data => {
      this.usersList = data; //copies the data gathered to userslist
      console.log(data);
    })
  }
  //Open a new modal to register
  submitRegister(){
    let registerModal = this.modalCtrl.create(SignupPage);
    registerModal.present();
  }

  //redirect to reset pass
  redirectResetPass(){
    this.navCtrl.push(ForgotPasswordPage, {
      notice: "UNDER CONSTRUCTION"
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
