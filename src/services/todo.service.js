import { test } from '@playwright/test';

export class ToDo {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todo', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todo`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;  
    });
  }     
}