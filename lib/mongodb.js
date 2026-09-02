import "server-only";
// 이 파일을 client 단에서 import못하게 막음
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB ?? "nextjs_components";

async function getClient() {
  if (!globalThis.nextjsComponentsMongoClientPromise) {
    const client = new MongoClient(uri);
    globalThis.nextjsComponentsMongoClientPromise = client.connect();
  }

  return globalThis.nextjsComponentsMongoClientPromise;
}

export async function getDb(){
  const client = await getClient();

  return client.db(dbName);
}