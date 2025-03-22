import express from 'express'
import {registerStudent ,filterStudents,updateStudent,deleteStudent } from '../controllers/student.Controller.js'
import { validateStudentInput,validateStudentInputUpdate } from '../middleware/studentMiddleware.js'

const router = express.Router()


  

/**
 * @swagger
 * /api/v1/students/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *                 example: "John Doe"
 *               registerNumber:
 *                 type: string
 *                 example: "REG123456"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               bloodGroup:
 *                 type: string
 *                 enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
 *                 example: "A+"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
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
 *             required:
 *               - studentName
 *               - registerNumber
 *               - dob
 *               - bloodGroup
 *               - department
 *               - studentAddress
 *               - dateOfJoin
 *     responses:
 *       201:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student registered successfully"
 *                 studentId:
 *                   type: string
 *                   example: "60d5ec49f1b2c8b1f8e4e1a2"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error: Student name is required"
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Register number already exists"
 */
router.post('/register', validateStudentInput, registerStudent);



/**
 * @swagger
 * /api/v1/students/filter:
 *   get:
 *     summary: Filter students based on various attributes
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: studentName
 *         required: false
 *         description: Name of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: false
 *         description: ID of the student to update
 *         schema:
 *           type: string
 *       - in: query
 *         name: registerNumber
 *         required: false
 *         description: Registration number of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: dob
 *         required: false
 *         description: Date of birth of the student (YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: query
 *         name: bloodGroup
 *         required: false
 *         description: Blood group of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         required: false
 *         description: Department of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: studentAddress
 *         required: false
 *         description: Address of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: clubName
 *         required: false
 *         description: Club name of the student
 *         schema:
 *           type: string
 *       - in: query
 *         name: dateOfJoin
 *         required: false
 *         description: Date of joining (YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: query
 *         name: Year
 *         required: false
 *         description:  Joined year (YYYY) or  Year range (YYYY-YYYY)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of filtered students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentName:
 *                     type: string
 *                   registerNumber:
 *                     type: string
 *                   dob:
 *                     type: string
 *                     format: date
 *                   bloodGroup:
 *                     type: string
 *                   department:
 *                     type: string
 *                   studentAddress:
 *                     type: string
 *                   clubName:
 *                     type: string
 *                   dateOfJoin:
 *                     type: string
 *                     format: date
 */
router.get('/filter', filterStudents); // Route to filter students

/**
 * @swagger
 * /api/v1/students/update/{id}:
 *   put:
 *     summary: Update a student's information
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *                 example: "John Doe"
 *               registerNumber:
 *                 type: string
 *                 example: "REG123456"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               bloodGroup:
 *                 type: string
 *                 enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
 *                 example: "A+"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
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
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student updated successfully"
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 */
router.put('/update/:id', validateStudentInputUpdate, updateStudent);


/**
 * @swagger
 * /api/v1/students/delete/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student deleted successfully"
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 */
router.delete('/delete/:id', deleteStudent);

export default router
