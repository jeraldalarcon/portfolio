import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, group, query, style, animate, keyframes, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('routeAnimation',[
      transition('* => *',[

        style({ height:'!'}),
        query(':enter',style({ transform: 'translateX(100%)', opacity:0.5}), { optional: true}),
        query(':leave',style({ transform: 'translateX(-100%)', opacity:0.5}), { optional: true}),
        query(':enter, :leave',style({ position:'absolute', top: -10 , left:0 ,right: 0}) , { optional: true}),
        group([
          query(':leave', [animate('0.6s ease-in',style({ transform: 'translateX(-100%)' }))], { optional: true}),
          query(':enter', [animate('0.3s ease-out', style({ transform: 'translateX(0)' }))] , { optional: true}),

        ])
      ]),

    ])
  ],

})


export class AppComponent {
  title = 'my-app';

  constructor(private userService:UserService, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(){

  }
  
   getDepth(outlet){
    return outlet.activatedRouteData['depth'];
  }




}
