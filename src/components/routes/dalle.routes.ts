import express, { Request, Response, Router } from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai"

dotenv.config();

const dalleRoute: Router = express.Router();

// * Config the OpenAI

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// * Create the instance of OpenAIApi

const openai = new OpenAIApi(config);

dalleRoute.route('/').get((req: Request, res: Response) => {
    res.status(200).json({ message: "Hello From DALL.E Routes" });
})

dalleRoute.route('/').post(async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: "b64_json"
        })

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Something went wrong" });
    }
})

export default dalleRoute;