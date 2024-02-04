export interface ICustomer {
      _id?: string | number ,
      name: string;
      userId: string;
      email: string;
      address?: string | null;
      phone?: string | null;
      dateOfBirth?: Date | null;
  }
  