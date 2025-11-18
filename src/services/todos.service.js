import { test } from "@playwright/test";

export class ToDos {
    constructor(request) {
        this.request = request;
      }
    
      async get(token, testinfo) {
        return test.step('GET /todos', async () => {
          const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
            headers: { 'X-CHALLENGER': token },
          });
          const body = await response.json();
          return body;
        });
      }

      async head(token, testinfo) {
        return test.step('HEAD /todos', async () => {
          const response = await this.request.head(`${testinfo.project.use.api}/todos`, {
            headers: { 'X-CHALLENGER': token },
          });
          return response;
        });
      }
    
      async createDoneTodo(token, testinfo, todoData) {
        return test.step('Create todo with doneStatus: true', async () => {
          const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
            headers: { 'X-CHALLENGER': token },
            data: {
              title: todoData.title,
              description: todoData.description,
              doneStatus: todoData.doneStatus,
            },
          });
          return response;
        });
      }
    
      async doneStatus(token, testinfo, todoData) {
        return test.step('Create todo with doneStatus: invalid', async () => {
          const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
            headers: { 'X-CHALLENGER': token },
            data: {
              doneStatus: todoData.doneStatus,
            },
          });
          return response;
        });
      }
    
      async put(token, testinfo, todoData) {
        return test.step('Put /todos/{id}', async () => {
          const response = await this.request.put(`${testinfo.project.use.api}/todos/15`, {
            headers: { 'X-CHALLENGER': token },
            data: {
              title: todoData.title,
              description: todoData.description,
              doneStatus: todoData.doneStatus,
            },
          });
          return response;
        });

      } 
    }
