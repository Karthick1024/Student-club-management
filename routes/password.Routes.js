import express from 'express'
import { ForgetPassword, ResetPassword } from '../controllers/password.Controller.js'

const router = express.Router()

router.post('/forget-password',ForgetPassword)
router.get('/reset-password',ResetPassword)

export default router