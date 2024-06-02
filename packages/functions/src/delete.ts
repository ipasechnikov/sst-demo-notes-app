import dynamodb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
  await dynamodb.delete({
    TableName: Table.Notes.tableName,
    Key: {
      userId: "123",
      noteId: event?.pathParameters?.id,
    },
  });

  return JSON.stringify({ status: true });
});
