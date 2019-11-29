import { UserService } from "../../user-service";
import { User } from "../../entity/User.entity";


export class UserFactory {

  constructor(private readonly appService: UserService) {}

  // for later use with factory-ts
  json(params: object = {}) {
    return Object.assign({
      firstname: 'Max',
      lastname: 'Muster',
      photos: []
    }, params
    )
  }

  build(params: object = {}): User {
    return Object.assign(new User(), this.json(params));
  }  

  create(params: Object = {}): Promise<User> {
    const user = this.build(params);
    return this.appService.createUser(user);
  }
}
