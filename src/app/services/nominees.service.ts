import { Injectable } from '@angular/core';
import { FirebaseNominee, Nominee } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class NomineesService {
  nominees: Nominee[] = [];

  constructor() {}

  getAllNominees(nominees: FirebaseNominee[]) {
    const contenstants = nominees.map((nominee) => {
      return {
        ...nominee,
        votes: this.calculateVotes(nominee.votes),
      };
    });
    this.nominees = contenstants;
    return this.nominees;
  }

  getNomineeByCode(code: string) {
    const nominee = this.nominees.find((nominee) => nominee.code === code);
    if (nominee) localStorage.setItem('nominee', JSON.stringify(nominee));
    return nominee;
  }

  calculateVotes(array: number[]) {
    return Array.isArray(array)
      ? array.reduce((acc, curr) => acc + curr, 0)
      : 0;
  }
}
