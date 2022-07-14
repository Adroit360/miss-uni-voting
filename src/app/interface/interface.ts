export interface Nominee {
  name: string;
  imageUrl: string;
  code: string;
  votes: number;
}
export interface FirebaseNominee {
  name: string;
  imageUrl: string;
  code: string;
  votes: number[];
}
