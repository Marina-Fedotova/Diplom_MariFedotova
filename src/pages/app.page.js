import { MainPage } from './main.page';
import { RegisterPage } from './register.page';
import { ArticlePage } from './article.page';
import { EditorPage } from './editor.page';

export class App {
 constructor(page) {
 this.page = page;
 this.mainPage = new MainPage(page);
 this.registerPage = new RegisterPage(page);
 this.articlePage = new ArticlePage(page);
 this.editorPage = new EditorPage(page);
 }
}