import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NomineesService } from '../services/nominees.service';
import { FirebaseNominee, Nominee } from '../interface/interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  nominees$: Observable<FirebaseNominee[]>;
  nominees: Nominee[] = [];
  loading = true;
  // votes$: Observable<any>;
  data: any = [];
  //startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  // startDate = new Date('2022-08-15');
  // endDate = new Date('22-08-21').setHours(23, 59, 59, 999);

  constructor(
    private firestore: AngularFirestore,
    private nomineeService: NomineesService
  ) {
    this.nominees$ = this.onGetAllNominees();
    this.nominees$.subscribe((nominees) => {
      this.nominees = this.nomineeService.getAllNominees(nominees);
      this.loading = false;
    });
  }

  ngOnInit(): void {}

  onGetAllNominees(): Observable<any> {
    this.loading = true;
    return this.firestore.collection('contestants').valueChanges();
  }

  onGetAllVotes(): Observable<any> {
    // this.loading = true;
    return this.firestore.collection('votes').valueChanges();
  }
}
