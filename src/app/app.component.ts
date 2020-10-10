import {Component} from '@angular/core';
import {PreloaderComponent} from './components/preloader/preloader.component'
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient,} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  preloader = true;

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  sendPostRequest(){
    this.http.post<any>('security/auth/login',{
      "email": "admin@example.com",
      "password": "admin"
    }).subscribe(data => {
      localStorage.setItem('sem_token',data.access_token)
      setTimeout(() => {
        this.preloader = false
        this.router.navigate(['auth/main'])
      }, 1000)
    })
  }

  ngOnInit() {
    this.sendPostRequest()
  }
}
