import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

interface data {
  success: Boolean;
  msg: string;
  invalidPass: Boolean;
  categoryReq: Boolean;
  countryReq: Boolean;
  stateReq: Boolean;
  cityReq: Boolean;
  regSuccess: Boolean;
  alreadyReg: Boolean;
  usernameTaken: Boolean;
  emailExists: Boolean;
  token: String;
  user: any;
  faculty: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  authTokenUser: any;

  constructor(private http: HttpClient) { }

  deleteAccount(userObj) {
    // console.log(userObj);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/admin/delete_user', userObj, { headers: headers })
      .pipe(map(res => res));
  }

  // Faculty

  getCourses(newName) {
    let newClass: Object;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    newClass = {
      name: newName
    }
    let body = JSON.stringify(newClass);
    let params = new HttpParams().set('requestData', encodeURIComponent(body));
    return this.http.get<data>('http://localhost:3000/users/faculty/get_courses', { headers: headers, params: params }).pipe(map(res => res));
  }

  removeCourse(faculty) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/faculty/remove_course', faculty, { headers: headers })
      .pipe(map(res => res));
  }

  addCourse(faculty) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/faculty/add_course', faculty, { headers: headers })
      .pipe(map(res => res));
  }

  getFacultyFromUniversity(param) {
    return this.http.get<data>('http://localhost:3000/users/faculty/get_faculty_from_university', { params: param })
      .pipe(map(res => res));
  }


  getFacultyForCourses(param) {
    return this.http.get<data>('http://localhost:3000/users/faculty/get_faculty_for_course', { params: param })
      .pipe(map(res => res));
  }

  removeFaculty(faculty) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/faculty/remove_faculty', faculty, { headers: headers })
      .pipe(map(res => res));
  }

  addFaculty(faculty) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/faculty/add_faculty', faculty, { headers: headers })
      .pipe(map(res => res));
  }

  // Faculty --

  getOnlineUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.loadToken(),
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<data>('http://localhost:3000/users/get_online_users', httpOptions).pipe(map(res => res));
  }

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.loadToken(),
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<data>('http://localhost:3000/users/get_all_users', httpOptions).pipe(map(res => res));
  }

  updatePassword(username, currentPassword, newPassword, newConfirmPassword) {
    let newUser: Object;
    newUser = {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword,
      newConfirmPassword: newConfirmPassword
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/update_password', newUser, { headers: headers })
      .pipe(map(res => res));
  }

  checkCurrentPassword(username, password) {
    let newUser: Object;
    newUser = {
      username: username,
      password: password
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/check_current_password', newUser, { headers: headers })
      .pipe(map(res => res));
  }

  getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.loadToken(),
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<data>('http://localhost:3000/users/profile', httpOptions).pipe(map(res => res));
  }


  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map(res => res));
  }

  storeUserData(userToken, user) {
    localStorage.setItem('id_token', userToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.authTokenUser = userToken;
    this.user = user;
  }

  loadToken() {
    const userToken = localStorage.getItem('id_token');
    return userToken;
  }

  loggedIn() {
    const helper = new JwtHelperService();
    var isExpired = helper.isTokenExpired(this.loadToken());
    return isExpired;
  }

  logout() {
    this.authTokenUser = null;
    this.user = null;
    window.localStorage.clear();
    location.reload();
  }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<data>('http://localhost:3000/users/register', user, { headers: headers })
      .pipe(map(res => res));
  }
}
