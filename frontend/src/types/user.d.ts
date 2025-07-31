export {};

declare global {
  type TUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    parent: number;
    role: string;
    phone_number: string;
  };
}
