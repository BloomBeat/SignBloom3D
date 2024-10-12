import express from "express";
import {
    getAnimationInfo,
    getAnimationClip,  
} from "../controllers/animationController.js";

const router = express.Router();

router.get('/info',getAnimationInfo);
router.get('/clip/:id',getAnimationClip);

export default router;