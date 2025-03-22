import express from 'express'
import {  Login, Logout, Register,deleteStaffAndHod, filterStaffAndHod,updateStaffAndHod } from '../controllers/auth.Controller.js'
import { validateLoginInput, validateRegisterinput } from '../middleware/validateMiddleware.js'

const router = express.Router()



/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "saran"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               role:
 *                 type: string
 *                 enum: [hod, staff]
 *               joined_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Registration Successful
 *       400:
 *         description: Bad Request
 */
router.post('/register', validateRegisterinput, Register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "saran"
 *               password:
 *                 type: string
 *                 example: "12345"
 *             required:
 *               - name
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateLoginInput, Login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get('/logout', Logout);

/**
 * @swagger
 * /api/v1/auth/filter:
 *   get:
 *     summary: Filter staff based on various attributes
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: staffName
 *         required: false
 *         description: Name of the staff
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: false
 *         description: ID of the staff 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of filtered staff
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   joined_date:
 *                     type: string
 */
router.get("/filter", filterStaffAndHod);

/**
 * @swagger
 * /api/v1/auth/update/{id}:
 *   put:
 *     summary: Update a staff's information
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the staff to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "karthi"
 *               studentAddress:
 *                 type: string
 *                 example: "123 Main St, Springfield"
 *               clubName:
 *                 type: string
 *                 example: "Science Club"
 *               dateOfJoin:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff updated successfully"
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Staff not found"
 */
router.put('/update/:id', validateRegisterinput, updateStaffAndHod);

/**
 * @swagger
 * /api/v1/auth/delete/{id}:
 *   delete:
 *     summary: Delete a Staff
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Staff to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff deleted successfully"
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Staff not found"
 */
router.delete('/delete/:id', deleteStaffAndHod);


export default router

