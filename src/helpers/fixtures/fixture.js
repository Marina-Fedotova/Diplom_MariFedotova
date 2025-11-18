import { test as base } from "@playwright/test";
import { App } from "../../pages/app.page";
import { Api } from "../../services/api.service";

export const test = base.extend({
 app: async ({ page }, use) => {
 const app = new App(page);
 await use(app);
 },
 api: async ({ request }, use) => {
const api = new Api(request);
 await use(api);
 },
 token: async ({ api }, use, testInfo) => {
  const r = await api.challenger.post(testInfo);
  const headers = r.headers();
  const token = headers['x-challenger'];
  await use(token);
},
});
