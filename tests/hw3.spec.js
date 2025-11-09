import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, ArticlePage, EditorPage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Пользователь может зарегистрироваться', async ({page}) => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.register(user);
    await expect(registerPage.profileNameField).toContainText(
        user.name,
    );
  });

test('Пользователь может добавить новую статью', async ({page}) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const article = {
  title: faker.word.words(),
  description: faker.food.description(),
  body: faker.food.ingredient(),
  tag: faker.word.adverb(5),
};

  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.gotoRegister();
  await registerPage.register(user);
  await articlePage.createNewArticle(article);
  await expect(articlePage.articleCheck).toContainText(article.title);
});


test('Пользователь может опубликовать комментарий', async ({page}) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const article = {
    title: faker.word.words(),
    description: faker.food.description(),
    body: faker.food.ingredient(),
    tag: faker.word.adverb(5),
    coment: faker.word.words(),
  };

  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const articlePage = new ArticlePage(page);
  const editorPage = new EditorPage(page);

  await mainPage.gotoRegister();
  await registerPage.register(user);
  await articlePage.createNewArticle(article);
  await expect(articlePage.articleCheck).toContainText(article.title);
  await editorPage.addComment(article);
  await expect(articlePage.articleCheck).toContainText(article.coment);
});

test('Пользователь может изменить статью', async ({page}) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const article = {
    title: faker.word.words(),
    description: faker.food.description(),
    body: faker.food.ingredient(),
    tag: faker.word.adverb(5),
  };

  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const articlePage = new ArticlePage(page);
  const editorPage = new EditorPage(page);

  await mainPage.gotoRegister();
  await registerPage.register(user);
  await articlePage.createNewArticle(article);
  await editorPage.updateArticle(article);
  await expect(articlePage.articleCheck).toContainText(article.title);
});

test('Пользователь в профиле видит свою статью', async ({page}) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const article = {
  title: faker.word.words(),
  description: faker.food.description(),
  body: faker.food.ingredient(),
  tag: faker.word.adverb(5),
};

  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.gotoRegister();
  await registerPage.register(user);
  await articlePage.createNewArticle(article);
  await expect(articlePage.articleCheck).toContainText(article.title);
  await articlePage.toProfile();
  await expect(articlePage.tabMyArticles).toBeVisible();
  await expect(articlePage.myArticle).toContainText(article.title);
});

test('Пользователь может перейти на таб "Favorited Articles"', async ({page}) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.gotoRegister();
  await registerPage.register(user);
  await articlePage.toFavorArticles()
  await expect(articlePage.tabFavorArticles).toBeVisible();
});

});


