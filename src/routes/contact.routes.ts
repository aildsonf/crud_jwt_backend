import { Request, Response, Router } from "express";
// local imports
import ContactController from "../controllers/ContactController";
import authMiddleware from "../middlewares/auth";

const contactRouter: Router = Router();

contactRouter.get("/users/contact/:id", (req: Request, res: Response) => {
  console.log(`GET /api/users/contact/${req.params.id}`);
  // authMiddleware(req.headers);
  ContactController.getOneByID(req.params.id)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

contactRouter.get("/users/contact", (req: Request, res: Response) => {
  console.log("GET /api/users/contact");
  // authMiddleware(req.headers);
  ContactController.list()
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

contactRouter.post("/users/contact/", (req: Request, res: Response) => {
  console.log("POST /api/users/contact");
  // authMiddleware(req.headers);
  ContactController.create(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

contactRouter.put("/users/contact/:id", (req: Request, res: Response) => {
  console.log(`PUT /api/users/contact/${req.params.id}`);
  // authMiddleware(req.headers);
  ContactController.update(req.params.id, req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

contactRouter.delete("/users/contact/:id", (req: Request, res: Response) => {
  console.log(`DELETE /api/users/contact/${req.params.id}`);
  // authMiddleware(req.headers);
  ContactController.destroy(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

export default contactRouter;
