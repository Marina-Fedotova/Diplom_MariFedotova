import { expect } from '@playwright/test';
import { test as baseTest }  from '../../src/helpers/fixtures/fixture';
import { UserBuilder, ArticleBuilder } from "../../src/helpers/builders/index.js";
const test = baseTest;

test.describe('Регистрация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Пользователь может зарегистрироваться',{ tag: '@UI'}, async ({app}) => {
    const user = new UserBuilder()
     .addName()
     .addEmail()
     .addPassword()
     .generate();

    await app.mainPage.gotoRegister();
    await app.registerPage.register(user);
    await expect(app.registerPage.profileNameField).toContainText(
        user.name,
    );
  });

test('Пользователь может добавить новую статью',{ tag: '@UI'}, async ({app}) => {
  const user = new UserBuilder()
  .addName()
  .addEmail()
  .addPassword()
  .generate();

  const article = new ArticleBuilder()
  .addTitle()
  .addDescription()
  .addBody()
  .addTag()
  .generate();

  await app.mainPage.gotoRegister();
  await app.registerPage.register(user);
  await app.articlePage.createNewArticle(article);
  await expect(app.articlePage.articleCheck).toContainText(article.title);
  await expect(app.articlePage.articleText).toContainText(article.body);
  await expect(app.articlePage.articleTags).toContainText(article.tag);
  await expect(app.articlePage.articleDescription).not.toBeVisible();

});


test('Пользователь может опубликовать комментарий',{ tag: '@UI'}, async ({app}) => {
    const user = new UserBuilder()
     .addName()
     .addEmail()
     .addPassword()
     .generate();

     const article = new ArticleBuilder()
     .addTitle()
     .addDescription()
     .addBody()
     .addTag()
     .addComment()
     .generate()
     ;

  await app.mainPage.gotoRegister();
  await app.registerPage.register(user);
  await app.articlePage.createNewArticle(article);
  await expect(app.articlePage.articleCheck).toContainText(article.title);
  await expect(app.articlePage.articleText).toContainText(article.body);
  await expect(app.articlePage.articleTags).toContainText(article.tag);
  await expect(app.articlePage.articleDescription).not.toBeVisible();
  await app.editorPage.addComment(article);
  await expect(app.articlePage.articleCheck).toContainText(article.coment);
});

test('Пользователь может изменить статью',{ tag: '@UI'}, async ({app}) => {
    const user = new UserBuilder()
     .addName()
     .addEmail()
     .addPassword()
     .generate();

     const article = new ArticleBuilder()
     .addTitle()
     .addDescription()
     .addBody()
     .addTag()
     .generate();
  
  await app.mainPage.gotoRegister();
  await app.registerPage.register(user);
  await app.articlePage.createNewArticle(article);
  await app.editorPage.updateArticle(article);
  await expect(app.articlePage.articleCheck).toContainText(article.title);
  await expect(app.articlePage.articleText).toContainText(article.body);
  await expect(app.articlePage.articleTags).toContainText(article.tag);
  await expect(app.articlePage.articleDescription).not.toBeVisible();
});

test('Пользователь в профиле видит свою статью',{ tag: '@UI'}, async ({app}) => {
    const user = new UserBuilder()
     .addName()
     .addEmail()
     .addPassword()
     .generate();

     const article = new ArticleBuilder()
     .addTitle()
     .addDescription()
     .addBody()
     .addTag()
     .generate();

  await app.mainPage.gotoRegister();
  await app.registerPage.register(user);
  await app.articlePage.createNewArticle(article);
  await expect(app.articlePage.articleCheck).toContainText(article.title);
  await expect(app.articlePage.articleText).toContainText(article.body);
  await expect(app.articlePage.articleTags).toContainText(article.tag);
  await expect(app.articlePage.articleDescription).not.toBeVisible();
  await app.articlePage.toProfile();
  await expect(app.articlePage.tabMyArticles).toBeVisible();
  await expect(app.articlePage.myArticle).toContainText(article.title);
});

test('Пользователь может перейти на таб "Favorited Articles"',{ tag: '@UI'}, async ({app}) => {
    const user = new UserBuilder()
     .addName()
     .addEmail()
     .addPassword()
     .generate();

  await app.mainPage.gotoRegister();
  await app.registerPage.register(user);
  await app.articlePage.toFavorArticles()
  await expect(app.articlePage.tabFavorArticles).toBeVisible();
});

});


