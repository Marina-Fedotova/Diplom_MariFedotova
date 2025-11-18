import { faker } from '@faker-js/faker';
export class UserBuilder {
 constructor() {
 this.user = {};
 }
 addName() {
 this.user.name = faker.person.fullName();
 return this;
 }
 addEmail() {
 this.user.email = faker.internet.email();
 return this;
 }
 addPassword() {
 this.user.password = faker.internet.password();
 return this;
 }
 generate() {
 return this.user;
 }
}