# Simple S3 Proxy

This is a very simple S3 proxy interface that is implemented by AWS API Gateway and Lambda.

## Development

It is developed with NodeJS 10 + TypeScript + Serverless framework. You can easily add some API editing `handler.ts` file with some editors such as Visual Studio Code.

1. `yarn` to install dependencies.
2. `code .` to edit `handler.ts` file.
3. `export BUCKET_NAME=something_awesome_you_want` to set a S3 bucket name to environment variable.
4. `yarn deploy` to deploy this into AWS environment.

### S3 Bucket

Before deploying this stack, please set `BUCKET_NAME` environment variable first. This is a S3 bucket to persist JSON objects and that is created by this CloudFormation stack. If you feel boring to set this value everytime before deploying, it is a good option to write this value into `.envrc` file and use [`direnv`](https://github.com/direnv/direnv) to export it automatically.

### AWS credentials

Of course, you should have an AWS account and set its credentials via environment variables. [This article](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html) may help you.

This credentials should be permitted with API Gateway, Lambda, S3, CloudWatch and CloudFormation to deploy a stack. Please check your permission when you encounter some errors while deploying.

## APIs

| API    | Description                                                             | Response            |
| ------ | ----------------------------------------------------------------------- | ------------------- |
| GET    | Get a stored object. `curl -XGET https://API/object-key`                | `content` or `null` |
| PUT    | Put an object to store. `curl -XPUT https://API/object-key -d '{JSON}'` | `true` or `false`   |
| DELETE | Delete a stored object. `curl -XDELETE https://API/object-key`          | `true`              |

There is no auth for this API to simply use, but you can add that feature easily via [Lambda Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).

## Actual example

After your first deploy, `Serverless framework` returns a report like this.

```text
Service Information
service: simple-s3-proxy
stage: production
region: ap-northeast-2
stack: simple-s3-proxy-production
resources: 21
api keys:
  None
endpoints:
  PUT - https://API-ID.execute-api.ap-northeast-2.amazonaws.com/production/{key}
  GET - https://API-ID.execute-api.ap-northeast-2.amazonaws.com/production/{key}
  DELETE - https://API-ID.execute-api.ap-northeast-2.amazonaws.com/production/{key}
functions:
  put: simple-s3-proxy-production-put
  get: simple-s3-proxy-production-get
  delete: simple-s3-proxy-production-delete
layers:
  None
```

An endpoint like `https://API-ID.execute-api.ap-northeast-2.amazonaws.com/production/{key}` is the endpoint to call. For example, you can put your `{"hello":"world"}` JSON with the `foo` key with below curl command.

```bash
curl -XPUT https://API-ID.execute-api.ap-northeast-2.amazonaws.com/production/foo -d '{"hello":"world"}'
```
