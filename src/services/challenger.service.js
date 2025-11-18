import { test } from '@playwright/test';

export class ChallengerService {
  constructor(request) {
    this.request = request;
  }

  async post(testinfo) {
    return test.step('POST /challenger', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/challenger`);
      return response;
    });
  }

  async getExistingXchallenger(testinfo, token) {
    return test.step('GET /challenger/{guid}', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/challenger/${token}`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }

  async putRestoreProgress(testinfo, token, progressData) {
    return test.step('PUT /challenger/{guid}', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/challenger/${token}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': token,
        },
        data: progressData,
      });
      return response;
    });
  }
}