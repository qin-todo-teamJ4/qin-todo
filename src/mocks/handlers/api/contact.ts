import { rest } from "msw";

type ContactPostBody = {
  name: string;
  email: string;
  message: string;
};
export const contactHandlers = [
  rest.post<ContactPostBody>("/api/contact", (req, res, ctx) => {
    if (req.body.email.includes("error")) {
      return res(ctx.status(500), ctx.json({ error: "error" }));
    }
    return res(ctx.status(200));
  }),
  rest.get("/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "foo",
        },
        {
          id: 2,
          name: "bar",
        },
        {
          id: 3,
          name: "hoge",
        },
      ])
    );
  }),
  rest.get("/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          test: "ok",
        },
        {
          id: 2,
          test: "error",
        },
        {
          id: 3,
          test: "stats",
        },
      ])
    );
  }),
];
