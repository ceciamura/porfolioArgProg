import { Component, OnInit} from '@angular/core';
import * as Aos from 'aos';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portolioArgProg';
  ngOnInit():void{
    Aos.init();
  }

}

