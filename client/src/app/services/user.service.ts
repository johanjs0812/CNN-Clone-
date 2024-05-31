import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, catchError } from 'rxjs';

export interface UserData {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  user?: {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: string;
  };
  warning1?: string;
  warning2?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users = new BehaviorSubject<any[]>([]);
  private selectedInfo: any = null;
  currentUser: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(private http: HttpClient) { }

  getusers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cnn/users').pipe(
      tap(users => this.users.next(users))
    );
  };

  updatedata(id: string, updatedData: any): void {
    try {
      this.http.put(`http://localhost:3000/api/cnn/users/edit/${id}`, updatedData).subscribe((response) => {
        console.log('Server response:', response);
        const currentusers = this.users.getValue();
        const index = currentusers.findIndex(item => item._id.toString() === id);
        if (index !== -1) {
          currentusers[index] = response;
          this.users.next(currentusers);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  addData(data: any){
    try {
      this.http.post(`http://localhost:3000/api/cnn/users/post/`, data).subscribe((response) => {
        console.log('Server response:', response);
        const currentusers = this.users.getValue();
        currentusers.push(response);
        this.users.next(currentusers);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  delete(id: string){
    try {
      this.http.delete(`http://localhost:3000/api/cnn/users/delete/${id}`).subscribe((response) => {
        console.log('Server response:', response);
        const currentusers = this.users.getValue();
        const index = currentusers.findIndex(item => item._id.toString() === id);
        if (index !== -1) {
          currentusers.splice(index, 1);
          this.users.next(currentusers);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  async singup(data: any): Promise<UserData | { warning1?: string, warning2?: string }> {
    console.log("Signup data:", data);
    try {
        const response = await this.http.post<UserData>(`http://localhost:3000/api/cnn/users/singup`, data).toPromise();
        if (response) {
          console.log('res//', response)
          return response;
        } else {
          throw new Error('No response from the server');
        }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      let warning1 = '', warning2 = '';
      if (typeof error === 'object' && error !== null && 'error' in error) {
          const err = error as { error: { username?: string, email?: string } };
          warning1 = err.error.username ?? '';
          warning2 = err.error.email ?? '';
      }
      return { _id: '', username: '', password: '', email: '', role: '', warning1, warning2 };
    }
  }

  async login(data: any): Promise<UserData | { warning1?: string, warning2?: string }> {
    console.log("Signup data:", data);
    try {
        const response = await this.http.post<UserData>(`http://localhost:3000/api/cnn/users/login`, data).toPromise();
        if (response) {
          this.currentUser.next(response);
          return response;
        } else {
          throw new Error('No response from the server');
        }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      let warning1 = '', warning2 = '';
      if (typeof error === 'object' && error !== null && 'error' in error) {
          const err = error as { error: { email?: string, password?: string } };
          warning1 = err.error.email ?? '';
          warning2 = err.error.password ?? '';
      }
      return { _id: '', username: '', password: '', email: '', role: '', warning1, warning2 };
    }
  }

  getusersData(): Observable<any[]> {
    return this.users.asObservable();
  }

  getCurrentUser(): UserData | null {
    return this.currentUser.value;
  }

  // ========================
  setSelectedInfo(info: any) {
    this.selectedInfo = info;
  }

  getSelectedInfo(): any {
    return this.selectedInfo;
  }
}
