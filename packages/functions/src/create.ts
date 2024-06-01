import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Table } from "sst/node/table";
import * as uuid from "uuid";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123",                // The id of the author
      noteId: uuid.v1(),            // A unique uuid
      content: data.content,        // Parsed from request body
      attachment: data.attachment,  // Parsed from request body
      createdAt: Date.now(),        // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
