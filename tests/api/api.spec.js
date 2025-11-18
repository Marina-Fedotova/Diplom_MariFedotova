import { expect } from "@playwright/test";
import { test } from '../../src/helpers/fixtures/fixture';
import { TodosBuilder } from "../../src/helpers/builders/index.js";

test.describe("Challenge", () => {

test("GET /challenges (200)", { tag: '@Api'}, async ({ api, token }, testinfo) => {
  let body = await api.challenges.get(token, testinfo);
  expect(body.challenges.length).toBe(59);
});

 test("GET /todos (404) not plural", { tag: '@Api'}, async ({ api, token }, testinfo) => {
    let respTodo = await api.todo.get(token, testinfo);
    expect(respTodo.status()).toBe(404);
  });

   test("HEAD /todos (200)", { tag: '@Api'}, async ({ api, token }, testinfo) => {
    let response = await api.todos.head(token, testinfo);
    expect(response.status()).toBe(200);
  });


   test("POST /todos (201)", { tag: '@Api'}, async ({ api, token }, testinfo) => {
    const todoData = new TodosBuilder()
    .addTitle()
    .addDescription()
    .generate();

    todoData.doneStatus = true;
   
    let response = await api.todos.createDoneTodo(token, testinfo, todoData);
    const r = await response.json();

    expect(response.status()).toBe(201);
    expect(r.title).toBe(todoData.title);
    expect(r.description).toBe(todoData.description);
    expect(r.doneStatus).toBe(todoData.doneStatus);
  });

   test("POST /todos (400) extra", { tag: '@Api'}, async ({ api, token }, testinfo) => {
    const todoData = {
      doneStatus: 'invalid',
    };
    let response = await api.todos.doneStatus(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Failed Validation: doneStatus should be BOOLEAN but was STRING');
  });

   test("PUT /todos/{id} (400)", { tag: '@Api'}, async ({ api, token }, testinfo) => {
    const todoData = new TodosBuilder()
    .addTitle()
    .addDescription()
    .generate();

    let response = await api.todos.put(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Cannot create todo with PUT due to Auto fields id');
  });

});