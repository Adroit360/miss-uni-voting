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
  //  votes$: Observable<any>;

  constructor(
    private firestore: AngularFirestore,
    private nomineeService: NomineesService
  ) {
    this.nominees$ = this.onGetAllNominees();
    this.nominees$.subscribe((nominees) => {
      this.nominees = this.nomineeService.getAllNominees(nominees);
      this.loading = false;
    });
    // this.votes$ = this.onGetAllVotes();
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
