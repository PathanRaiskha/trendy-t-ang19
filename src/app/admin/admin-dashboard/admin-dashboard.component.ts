import { Component } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router:Router, private activatedRoute:ActivatedRoute){
    console.log('AdminDashboardComponent Loaded.........');

  }
  ngOnInit(){
    this.router.navigate([{outlets: {adminOutlet: ['userDashboard']}}],{relativeTo:this.activatedRoute});

  }
  ClickUserDashboard1(locaton:string)
  {
    this.router.navigate([{outlets: {adminOutlet: [locaton]}}],{relativeTo:this.activatedRoute});
    //this.router.navigate(['userDashboard'],{relativeTo:this.activatedRoute});

  }
}
