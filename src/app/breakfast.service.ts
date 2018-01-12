import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Breakfast, Participant} from './breakfast';
import 'rxjs/add/operator/map';
import {tap} from 'rxjs/operators';

@Injectable()
export class BreakfastService {

    constructor(private http: HttpClient) {
    }

    private breakfastsUrl = 'http://localhost:5000/api/breakfast';

    public getBreakfasts(): Observable<Breakfast[]> {
        return this.http.get<Breakfast[]>(this.breakfastsUrl);
    }

    public getBreakfast(id: String): Observable<Breakfast> {
        const url = `${this.breakfastsUrl}/${id}`;
        // return this.http.get<Breakfast>(url);
        return this.http.get(url).map((res: Breakfast) => {
            return new Breakfast().deserialize(res);
        });
    }

    public saveParticipant(breakfast: Breakfast, participant: Participant) {
        const url = `${this.breakfastsUrl}/${breakfast._id}`;
        return this.http.put<Breakfast>(url, participant);
    }
}
