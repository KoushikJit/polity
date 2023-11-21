import { updateVectorDB } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { indexName } from "@/config";

export async function POST(req: Request, res: Response) {

  const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".rtf": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
  });
  const docs = await loader.load();

  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
    environment: process.env.PINECONE_ENVIRONMENT ?? "",
  });
  await updateVectorDB(client, indexName, docs);
  return new Response("abc", { status: 200 });
}
