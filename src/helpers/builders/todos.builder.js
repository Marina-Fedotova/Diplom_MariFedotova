import { faker } from '@faker-js/faker';

export class TodosBuilder {
    constructor() {
    this.todoData = {};
    }
    addTitle() {
    this.todoData.title = faker.lorem.words(3);
    return this;
    }
    addDescription() {
    this.todoData.description = faker.lorem.sentence();
    return this;
    }
    generate() {
    return this.todoData;
    }
   }