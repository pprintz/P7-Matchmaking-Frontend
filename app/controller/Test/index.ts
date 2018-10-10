// Import express functions
import { Response, Request } from 'express';

// Import model functions
import { helloRetrieve } from '../../model/Test/testModel';

// Define hello function
export function hello(req: Request, res: Response){
    // Send response with message from model
    res.send(helloRetrieve("test message!"));
}