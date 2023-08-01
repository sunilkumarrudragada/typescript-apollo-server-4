export enum EProvider {
  Google = "google",
  Password = "password",
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  currentProvider: EProvider; // Use the Provider enum type
  providers: EProvider[]; // Use the Provider enum type as array elements
}
