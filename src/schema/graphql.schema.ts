/* tslint:disable */
export class CreateUserInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export abstract class IMutation {
  abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
  abstract user(id: string): User | Promise<User>;

  abstract users(): User[] | Promise<User[]>;

  abstract temp__(): boolean | Promise<boolean>;
}

export class User {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
}
