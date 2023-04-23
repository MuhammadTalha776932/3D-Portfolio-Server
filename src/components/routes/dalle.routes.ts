import express, { Request, Response, Router } from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai"

dotenv.config();

const dalleRoute: Router = express.Router();

// * Config the OpenAI

const config = new Configuration({
    apiKey: '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',
})

// * Create the instance of OpenAIApi

const openai = new OpenAIApi(config);

dalleRoute.route('/').get((req: Request, res: Response) => {
    res.status(200).json({ message: "Hello From DALL.E Routes" });
})

dalleRoute.route('/').post(async (req: Request, res: Response) => {
    try {
        const { prompt } = <{ prompt: string }>req.body;

        console.log(`here is prompt message ${prompt}`)

        const response = await openai.createImage({
            user: 'fuckyou',
            prompt: "A cute baby",
            n: 1,
            size: '1024x1024',
            response_format: "b64_json"
        }, {})

        console.log(response.data.data[0].url);

        const image = response.data.data[0].b64_json;

        console.log(`here is the image response from DELL.E  ${image}`)


        res.status(200).send({ photo: image || "" });
    } catch (error: any) {
        console.error(error.response.status);

        res.status(error.response.status).json({ message: error.message });
    }
})

export default dalleRoute;