import * as dotenv from 'dotenv';
import express, { Request, Response, Express } from 'express';
import cors from 'cors'

// * Config the .env file here
dotenv.config();

// * create the instence of Express 
const app: Express = express();

// * setup the middleware 

app.use(cors());
app.use(express.json({ limit: '50mb' }));


// * handle the default route get request and response
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from DALL.E" });
});


// * Listen the server at localhost:3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
