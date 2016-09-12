declare module "connect-dynamodb" {
    import * as express from "express";
    import * as session from "express-session";
    import * as AWS from "aws-sdk";

    interface GlobalOptions {
      session: (options?: session.SessionOptions) => express.RequestHandler
    }

    function s(connect: GlobalOptions): s.DynamoDBStore;

    namespace s {
        interface DynamoDBStore extends session.Store {
            new (options: DynamoDBStoreOptions): session.Store;
        }
        interface DynamoDBStoreOptions {
            client?: AWS.DynamoDB;
            AWSConfigPath?: string;
            AWSConfigJSON?: AWS.ClientConfigPartial;
            table: string;
            AWSRegion?: string;
            hashKey?: string;
            prefix?: string;
            reapInterval?: number;
        }
    }

    export = s;
}
