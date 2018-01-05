import { Router } from 'express';
const router = Router();

router.get('/allcars', (req, res) => {
    console.log(req);
    res.sendStatus(200);
});

export default router;