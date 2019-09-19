import { APIGatewayProxyHandler } from "aws-lambda";
import { S3 } from "aws-sdk";
import "source-map-support/register";

const s3 = new S3();
const bucketName = process.env.BUCKET_NAME!;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

export const put: APIGatewayProxyHandler = async event => {
  const { key } = event.pathParameters;
  try {
    await s3
      .putObject({
        Bucket: bucketName,
        Key: key,
        Body: event.body
      })
      .promise();
    return { statusCode: 200, headers, body: "true" };
  } catch (error) {
    console.error(`PutError`, key, error);
    return { statusCode: 400, headers, body: "false" };
  }
};

export const get: APIGatewayProxyHandler = async event => {
  const { key } = event.pathParameters;
  try {
    const obj = await s3
      .getObject({
        Bucket: bucketName,
        Key: key
      })
      .promise();
    return { statusCode: 200, headers, body: obj.Body.toString("utf-8") };
  } catch (error) {
    console.error(`GetError`, key, error);
    return { statusCode: 400, headers, body: "null" };
  }
};

export const erase: APIGatewayProxyHandler = async event => {
  const { key } = event.pathParameters;
  try {
    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: key
      })
      .promise();
    return { statusCode: 200, headers, body: "true" };
  } catch (error) {
    console.error(`DeleteError`, key, error);
    return { statusCode: 400, headers, body: "false" };
  }
};
