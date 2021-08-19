import { Request, Response, Router } from "express";
// local imports
import AccountController from "../controllers/AccountController";

const accountRouter: Router = Router();

accountRouter.get("/accounts/:id", (req: Request, res: Response) => {
  console.log(`GET /api/accounts/${req.body.login}`);
  AccountController.findOne(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

accountRouter.get("/accounts", (req: Request, res: Response) => {
  console.log("GET /api/accounts");
  AccountController.list(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

accountRouter.post("/accounts", (req: Request, res: Response) => {
  console.log("POST /api/accounts");
  AccountController.create(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

accountRouter.put("/accounts/:id", (req: Request, res: Response) => {
  console.log("PUT /api/accounts");
  AccountController.update(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

accountRouter.patch("/accounts/activate/:id", (req: Request, res: Response) => {
  console.log("PATCH /api/accounts");
  AccountController.activate(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

accountRouter.patch(
  "/accounts/deactivate/:id",
  (req: Request, res: Response) => {
    console.log("PATCH /api/accounts");
    AccountController.deactivate(req.body)
      .then((payload) => res.send(payload))
      .catch((err) => res.send(err));
  }
);

accountRouter.patch("/accounts/block/:id", (req: Request, res: Response) => {
  console.log("PATCH /api/accounts");
  AccountController.block(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

export default accountRouter;
