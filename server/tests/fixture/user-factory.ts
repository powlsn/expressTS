import { AppService } from "../../app-service";
import { User } from "../../entity/User.entity";
import { IUser } from "../../interfaces/IUser";


export class UserFactory {
  user: IUser;

  constructor(private readonly appService: AppService) {

  }

  // for later use with factory-ts
  json(params: object = {}) {
    return Object.assign({
      firstname: 'Max',
      lastname: 'Muster'
    }, params
    )
  }

  build(params: object = {}): IUser {
    return Object.assign({
      firstname: 'Max',
      lastname: 'Muster'
    }, params);
  }

  create(params: Object = {}): Promise<User> {
    const user = this.build(params);
    return this.appService.createUser(user);
  }
}
