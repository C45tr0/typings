import * as connectDynamoDB from "connect-dynamodb";
import * as session from "express-session";

let DynamoDBStore = connectDynamoDB({session: session});
