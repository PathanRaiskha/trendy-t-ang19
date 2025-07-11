import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserStoreService } from '../../../shared/services/user-store.service';
import { AddToCartService } from '../../../shared/services/add-to-cart.service';




@Component({
  standalone: false,
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent {




  cartCount: number = 0;
  isLoggedIn: boolean = false;
  centered = false;
  disabled = false;
  unbounded = false;
  colorName = 'red';
  radius: number = 2;
  color!: string;
  userName: string = '';
  private _router = inject(Router);
  private userStore = inject(UserStoreService);
  private authService = inject(AuthenticationService);
  constructor(private cartService: AddToCartService) {

  }
  ngOnInit() {


    this.userStore.getFullNameFromStore().subscribe(res => {
      let un = this.authService.getfullNameFromToken();
      this.userName = res || un;

      this.isLoggedIn = this.authService.isLoggedIn();
      
      this.cartService.getCartObservable().subscribe((items) => {
        this.cartCount = items.length;
      });





    }

    )
  };





  goToLogin() {
    this._router.navigateByUrl('/login');
  }
  Logout() {
    localStorage.removeItem('cartItems');
    this.authService.signOut();
    this.userStore.setFullNameForStore(undefined);
    this.userStore.setRoleForStore(undefined);
  }

  showcartedproduct() {
    this._router.navigateByUrl('/cartlist');

  }


  gotoHome(){
    this._router.navigateByUrl('/home');
  }




}
