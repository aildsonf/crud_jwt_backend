import { Request, Response, Router } from "express";
import * as dotenv from "dotenv";
// local imports
import AccountController from "../controllers/AccountController";

dotenv.config();
if (
  !process.env.ACCOUNT_STATUS_ACTIVE ||
  !process.env.ACCOUNT_STATUS_INACTIVE ||
  !process.env.ACCOUNT_STATUS_BLOCKED
) {
  process.exit(1);
}
const status_active: string = process.env.ACCOUNT_STATUS_ACTIVE;
const status_inactive: string = process.env.ACCOUNT_STATUS_INACTIVE;
const status_blocked: string = process.env.ACCOUNT_STATUS_BLOCKED;

const accountRouter: Router = Router();

accountRouter.get("/accounts/:id", (req: Request, res: Response) => {
  console.log(`GET /api/accounts/<${req.params.id}>`);
  AccountController.getOneByID(req.params.id).then((payload: any) =>
    res.status(payload.status).send(payload.response)
  );
});

accountRouter.get("/accounts", (req: Request, res: Response) => {
  console.log("GET /api/accounts");
  AccountController.list(status_active).then((payload: any) =>
    res.status(payload.status).send(payload.response)
  );
});

accountRouter.post("/accounts", (req: Request, res: Response) => {
  console.log("POST /api/accounts");
  AccountController.create(req.body).then((payload: any) =>
    res.status(payload.status).send(payload.response)
  );
});

accountRouter.put("/accounts/:id", (req: Request, res: Response) => {
  console.log("PUT /api/accounts");
  AccountController.update(req.params.id, req.body).then((payload: any) =>
    res.status(payload.status).send(payload.response)
  );
});

accountRouter.patch("/accounts/activate/:id", (req: Request, res: Response) => {
  console.log(`PATCH /api/accounts/<${req.params.id}>`);
  AccountController.changeStatus(req.params.id, status_active).then(
    (payload: any) => res.status(payload.status).send(payload.response)
  );
});

accountRouter.patch(
  "/accounts/deactivate/:id",
  (req: Request, res: Response) => {
    console.log(`PATCH /api/accounts/<${req.params.id}>`);
    AccountController.changeStatus(req.params.id, status_inactive).then(
      (payload: any) => res.status(payload.status).send(payload.response)
    );
  }
);

accountRouter.patch("/accounts/block/:id", (req: Request, res: Response) => {
  console.log(`PATCH /api/accounts/<${req.params.id}>`);
  AccountController.changeStatus(req.params.id, status_blocked).then(
    (payload: any) => res.status(payload.status).send(payload.response)
  );
});

export default accountRouter;
