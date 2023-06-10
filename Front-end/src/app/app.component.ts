import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end';

  //delete token when app is off
  // @HostListener('window:unload')
  // private onUnload(): void {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('role');
  // }
}
