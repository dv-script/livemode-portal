export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
