import { faker } from '@faker-js/faker';
export class ArticleBuilder {
 constructor() {
 this.article = {};
 }
 addTitle() {
 this.article.title = faker.word.words();
 return this;
 }
 addDescription() {
 this.article.description = faker.food.description();
 return this;
 }
 addBody() {
 this.article.body = faker.food.ingredient();
 return this;
 }
 addTag() {
 this.article.tag = faker.word.adverb(5);
 return this;
 }
 addComment() {
 this.article.coment = faker.word.words();
 return this;
 }
 generate() {
 return this.article;
 }
}