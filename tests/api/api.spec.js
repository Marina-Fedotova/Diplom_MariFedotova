import { test, expect } from "@playwright/test";

test.describe("Challenge", () => {
  let URL = "https://apichallenges.herokuapp.com/";
  let token;

  test.beforeAll('Get token @authorization', async ({ request }) => {
    let response = await request.post(`${URL}challenger`);
    let headers = response.headers();
    token = headers["x-challenger"];
    console.log(token);
    expect(headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });


  test("GET /challenges (200)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}challenges`, {
      headers: {"x-challenger": token,},
    });
    let body = await response.json();
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.challenges.length).toBe(59);
  });


  test("GET /todos (200)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {"x-challenger": token,},
    });
    let body = await response.json();
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.todos.length).toBe(10);
  });


  test("GET /todo (404) not plural", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todo`, {
      headers: {"x-challenger": token,},
    });
    let headers = response.headers();
    expect(response.status()).toBe(404);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("GET /todos/{id} (200)", { tag: '@Api'}, async ({ request }) => {
    let listResponse = await request.get(`${URL}todos`, {
      headers: {"x-challenger": token,},
    });
    let listBody = await listResponse.json();
    const todoId = listBody.todos[0].id;
    let response = await request.get(`${URL}todos/${todoId}`, {
      headers: {"x-challenger": token,},
    });
    let body = await response.json();
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.todos[0].id).toEqual(todoId);
  });


  test("GET /todos/{id} (404)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos/17`, {
    headers: {"x-challenger": token,},
    });
    let headers = response.headers();
    expect(response.status()).toBe(404);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("HEAD /todos (200)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.head(`${URL}todos`, {
      headers: {"x-challenger": token,},
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("POST /todos (201)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Новая задача",
        description: "Описание моей задачи",
        doneStatus: true
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let responseBody = await response.json();
    let headers = response.headers();
    expect(response.status()).toBe(201);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody).toMatchObject(todoData);
  });


  test("GET /todos (200) ?filter", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {"x-challenger": token,},
      params: {
        doneStatus: true
      }
    });
    let headers = await response.headers();
    let responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody).toHaveProperty('todos');
    expect(Array.isArray(responseBody.todos)).toBe(true);
    expect(responseBody.todos).not.toHaveLength(0);
  });


  test("POST /todos (400) doneStatus", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Привет",
        description: "Description",
        doneStatus: "string"
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(400);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });
  

  test("POST /todos (400) title too long", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Привет".repeat(12),
        description: "Description",
        doneStatus: true
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(400);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("POST /todos (400) description too long", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Привет",
        description: "Привет".repeat(34),
        doneStatus: true
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(400);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("POST /todos (201) max out content", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Ку".repeat(25),
        description: "Пока".repeat(50),
        doneStatus: true
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    let responseBody = await response.json();
    expect(response.status()).toBe(201);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody.title).toBe(todoData.title);
    expect(responseBody.description).toBe(todoData.description);
    expect(responseBody.doneStatus).toBe(todoData.doneStatus);
  });


  test("POST /todos (413) content too long", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Куку".repeat(1250),
        description: "Description",
        doneStatus: true
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(413);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });
  

  test("POST /todos (400) extra", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Новая задача",
        description: "Описание моей задачи",
        doneStatus: true,
        priority: "extra"
    };
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(400);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("PUT /todos/{id} (400)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
      doneStatus: true,
      description: "реклама",
    };
    let response = await request.put(`${URL}todos/122222`, {
      headers: {"x-challenger": token,},
      data: todoData,
    });
    let headers = response.headers();
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(response.status()).toBe(400);
  });


  test("POST /todos/{id} (200)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Новая задача",
        description: "Описание моей задачи",
        doneStatus: true
    };
    let response = await request.post(`${URL}todos/9`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let responseBody = await response.json();
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody.title).toBe(todoData.title);
    expect(responseBody.description).toBe(todoData.description);
    expect(responseBody.doneStatus).toBe(todoData.doneStatus);
  });


  test("POST /todos/{id} (404)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
        title: "Новая задача",
        description: "Описание моей задачи",
        doneStatus: true
    };
    let response = await request.post(`${URL}todos/989`, {
      headers: {
        "x-challenger": token,
        "content-type": "application/json"
      },
      data: todoData
    });
    let headers = response.headers();
    expect(response.status()).toBe(404);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("PUT /todos/{id} full (200)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
      title: "Новое название",
      doneStatus: true,
      description: "Новое описание"
    };
    let response = await request.put(`${URL}todos/9`, {
      headers: {"x-challenger": token,},
      data: todoData,
    });
    let headers = response.headers();
    let responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody.title).toBe(todoData.title);
    expect(responseBody.description).toBe(todoData.description);
    expect(responseBody.doneStatus).toBe(todoData.doneStatus);
  });


  test("PUT /todos/{id} partial (200)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
      title: "Новое название"
    };
    let response = await request.put(`${URL}todos/9`, {
      headers: {"x-challenger": token,},
      data: todoData,
    });
    let headers = response.headers();
    let responseBody = await response.json();
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(responseBody.title).toBe(todoData.title);
    expect(response.status()).toBe(200);
  });


  test("PUT /todos/{id} no title (400)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
      doneStatus: true,
      description: "Новое описание"
    };
    let response = await request.put(`${URL}todos/9`, {
      headers: {"x-challenger": token,},
      data: todoData,
    });
    let headers = response.headers();
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(response.status()).toBe(400);
  });


  test("PUT /todos/{id} no amend id (400)", { tag: '@Api'}, async ({ request }) => {
    const todoData = {
      id: 10,
      doneStatus: true,
      description: "Новое описание"
    };
    let response = await request.put(`${URL}todos/9`, {
      headers: {"x-challenger": token,},
      data: todoData,
    });
    let headers = response.headers();
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(response.status()).toBe(400);
  });


  test("DELETE /todos/{id} (200)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.delete(`${URL}todos/9`, {
      headers: {"x-challenger": token,},
    });
    let headers = response.headers();
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(response.status()).toBe(200);
  });


  test("OPTIONS /todos (200)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.fetch(`${URL}todos`, {
      headers: {"x-challenger": token,},
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });


  test("GET /todos (200) XML", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml"
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('xml');
  });


  test("GET /todos (200) JSON", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json"
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('json');
  });


  test("GET /todos (200) ANY", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "*/*"
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('json');
  });


  test("GET /todos (200) XML pref", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml, application/json"
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('xml');
  });

  test("GET /todos (200) no accept", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('json');
  });


  test("GET /todos (406)", { tag: '@Api'}, async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/gzip"
      },
    });
    let headers = response.headers();
    expect(response.status()).toBe(406);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(headers['content-type']).toContain('json');
  });
});