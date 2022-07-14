import { Nominee } from './../interface/interface';
import { NomineesService } from './../services/nominees.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private nomineeService: NomineesService,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer
  ) {}

  checkoutForm = new FormGroup({
    votes: new FormControl(1, [
      Validators.required,
      Validators.pattern(/[0-9]+/),
    ]),
  });
  submitted = false;
  clientTransactionId = '';
  loading = false;
  url = 'https://gob3-friday.herokuapp.com/paystack/payment';
  //url = 'http://localhost:8000/paystack/payment';
  payStackUrl: any;
  nominee: Nominee = {
    name: '',
    code: '',
    imageUrl: '',
    votes: 0,
  };

  payStackModal = false;

  ngOnInit(): void {
    window.scroll(0, 0);
    this.route.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      const data: any = this.nomineeService.getNomineeByCode(id);

      if (data) {
        this.nominee = data;
        return;
      } else {
        const contestant = localStorage.getItem('nominee');
        if (contestant) {
          this.nominee = JSON.parse(contestant);
        }
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const uuid = uuidv4().split('-').slice(0, 2).join('');
    this.clientTransactionId = uuid;

    if (this.checkoutForm.invalid) {
      window.scroll(0, 0);
      return;
    }
    // payment
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.loading = true;

    const votingDetails = {
      code: this.nominee.code,
      voteId: this.clientTransactionId,
      votes: this.checkoutForm.value.votes,
    };

    const body = {
      // amount: this.checkoutForm.value.votes * 100,
      amount: 0.01 * 100,
      clientId: this.clientTransactionId,
      votingDetails: votingDetails,
    };
    this.http.post<PaymentResponse>(this.url, body, httpOptions).subscribe(
      (res: any) => {
        if (res.error) {
          this.loading = false;
        }
        this.payStackUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          res.auth_url
        );
        this.payStackModal = true;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onCloseModal(): void {
    this.payStackModal = false;
    this.router.navigate(['/']);
  }
}
