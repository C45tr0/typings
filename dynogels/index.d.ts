declare module "dynogels" {
  import * as Joi from 'joi';
  import * as Bunyan from 'bunyan';
  import * as _AWS from 'aws-sdk';

  interface SchemaTypes {
    stringSet(): Joi.ArraySchema;
    numberSet(): Joi.ArraySchema;
    binarySet(): Joi.ArraySchema;
    uuid(): Joi.StringSchema;
    timeUUID(): Joi.StringSchema;
  }

  interface SchemaConfig {

  }

  interface ThroughputConfig {
    readCapacity: number;
    writeCapacity: number;
  }

  interface Query {
    hashKey: string;
    table: any;
    serializer: any;

    options: any;
    request: any;

    limit(num: number): Query;
    filterExpression(expression: string): Query;
    expressionAttributeValues(data: string[]): Query;
    expressionAttributeValues(data: string[]): Query;
    projectionExpression(data: string[]): Query;

    usingIndex(name: string): Query;
    consistentRead(read: boolean): Query;
    addKeyCondition(condition: string);
    addFilterCondition(condition: string): Query;
    startKey(hashKey: string, rangeKey: string): Query;
    attributes(attrs: string | string[]): Query;
    ascending(): Query;
    descending(): Query;
    select(value: string): Query;
    returnConsumedCapacity(value: string): Query;
    loadAll(): Query;

    where(keyName: string): QueryKeyCondition;
    filter(keyName: string): QueryFilter;

    exec(callback: any): any;
    buildKey(): any;
    buildRequest(): any;
  }

  interface QueryKeyCondition {
    equals(value: any): Query;
    eq(value: any): Query;
    lte(value: any): Query;
    lt(value: any): Query;
    gte(value: any): Query;
    gt(value: any): Query;
    beginsWith(value: any): Query;
    between(value: any, value2: any): Query;
  }

  interface QueryFilter {
    equals(value: any): Query;
    eq(value: any): Query;
    ne(value: any): Query;
    lte(value: any): Query;
    lt(value: any): Query;
    gte(value: any): Query;
    gt(value: any): Query;
    null(): Query;
    exists(): Query;
    contains(value: any): Query;
    notcontains(value: any): Query;
    in(value: any): Query;
    beginsWith(value: any): Query;
    between(value: any, value2: any): Query;
  }

  interface Scan {

  }

  interface ParallelScan {

  }

  interface Model {
    log: Bunyan.Logger;

    config(config: any): any;

    after()
    before()

    get(hashKey: any, callback: (err: any, item: any) => void): void;
    get(hashKey: any, options: any, callback: (err: any, item: any) => void): void;
    get(hashKey: any, rangeKey: any, callback: (err: any, item: any) => void): void;
    get(hashKey: any, rangeKey: any, options: any, callback: (err: any, item: any) => void): void;

    create(item: any, callback: (err: any, item: any) => void): void;
    create(item: any, options: any, callback: (err: any, item: any) => void): void;

    create(items: any[], callback: (err: any, items: any[]) => void): void;
    create(items: any[], options: any, callback: (err: any, items: any[]) => void): void;

    update(item: any, callback: (err: any, item: any) => void): void;
    update(item: any, options: any, callback: (err: any, item: any) => void): void;

    destroy(hashKey: any, callback: (err: any, item: any) => void): void;
    destroy(hashKey: any, options: any, callback: (err: any, item: any) => void): void;
    destroy(hashKey: any, rangeKey: any, callback: (err: any, item: any) => void): void;
    destroy(hashKey: any, rangeKey: any, options: any, callback: (err: any, item: any) => void): void;

    query(hashKey: any): Query;
    scan(): Scan;
    parallelScan(totalSegments: number): ParallelScan;

    getItems(keys: any[], callback: (err: any, items: any) => void): void;
    getItems(keys: any[], options: any, callback: (err: any, items: any) => void): void;

    batchGetItems(keys: any[], callback: (err: any, items: any) => void): void;
    batchGetItems(keys: any[], options: any, callback: (err: any, items: any) => void): void;

    createTable(callback: (err: any) => void): void;
    createTable(options: any, callback: (err: any) => void): void;

    updateTable(callback: (err: any) => void): void;
    updateTable(throughput: ThroughputConfig, callback: (err: any) => void): void;

    deleteTable(callback: (err: any) => void): void;

    tableName(): string;
  }

  export var AWS: typeof _AWS;
  export var log: Bunyan.Logger;

  export var types: SchemaTypes;

  export function dynamoDriver(): _AWS.DynamoDB;
  export function dynamoDriver(driver: _AWS.DynamoDB): _AWS.DynamoDB;

  export function documentClient(): _AWS.DynamoDB.DocumentClient;
  export function documentClient(docClient: _AWS.DynamoDB.DocumentClient): _AWS.DynamoDB.DocumentClient;

  export function reset(): void;
  export function Set(...args: any[]): { values: any[], type: string };
  export function define(modelName: string, config: SchemaConfig): Model;

  export function model(name: string): Model;
  export function model(name: string, model: Model): Model;

  export function createTables(callback: (err: any) => void): void;
  export function createTables(options: { [modelName: string]: ThroughputConfig }, callback: (err: any) => void): void;
}
