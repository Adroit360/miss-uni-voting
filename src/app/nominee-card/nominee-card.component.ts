import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nominee } from '../interface/interface';

@Component({
  selector: 'app-nominee-card',
  templateUrl: './nominee-card.component.html',
  styleUrls: ['./nominee-card.component.scss'],
})
export class NomineeCardComponent implements OnInit {
  @Input() nominee = {
    name: '',
    imageUrl: '',
    code: '',
    votes: 0,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onVote(code: string) {
    this.router.navigate(['/vote', code]);
  }
}
