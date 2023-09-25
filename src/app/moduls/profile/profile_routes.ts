import { Router } from "express";
import { getProfile } from "./profile_controller";

const router = Router();

router.get("/", getProfile);

export const ProfileRoutes = router;
