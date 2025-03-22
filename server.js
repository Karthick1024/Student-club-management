import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from "cors"
import studentRoutes from './routes/student.Routes.js'
import authRoutes from './routes/auth.Routes.js'
import userRoutes from './routes/password.Routes.js'
import errorMiddleware from './middleware/errorHandleware.js'  
dotenv.config()

const app = express()


app.use(cookieParser())
app.use(express.json())



app.use(cors({
  origin: '*', 
  credentials: true, 
}));


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Erode Arts & Science college',
      version: '1.0.0',
      description: 'API Documentation for a managing the student info department wise',
    },  
    servers: [
      {
        url: 'http://localhost:5100', 
      },
      {
        url: 'https://qp852v4n-5100.inc1.devtunnels.ms/', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log('Response Body:', body);
    return originalSend.call(this, body);
  };
  console.log(`Request URL: ${req.originalUrl}`);
  console.log('Request Body:', req.body);

  next();
});


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/students',studentRoutes)
app.use('/api/v1/users', userRoutes)



app.use('*', (req, res) => {
  res.status(404).json({ msg: "Page not found " })
})


app.use(errorMiddleware)


app.get('/api', (req, res) => {
  res.send('Hi, Facebook-like API')
})


const port = process.env.PORT || 3100

app.listen(port, async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL environment variable is not defined');
      process.exit(1); 
    }
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected');
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); 
  }
})
