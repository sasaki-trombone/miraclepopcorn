import type { LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { microcmsClient } from "~/libs/microcmsClient.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

interface Env {
  MICROCMS_SERVICE_DOMAIN: string;
  MICROCMS_API_KEY: string;
}

export const loader:LoaderFunction = async ({context}: LoaderFunctionArgs) => {
  const env = context.cloudflare.env as Env;
  const data = await microcmsClient({serviceDomain: env.MICROCMS_SERVICE_DOMAIN, apiKey: env.MICROCMS_API_KEY}).get({endpoint: 'articles', queries: {fields: 'id,title'}});
  return data;
}

export default function Index() {
  const data = useLoaderData();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">miracle popcorn</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          {data.contents.map((article: any) => <div key={article.id}>{article.title}</div>)}
        </li>
      </ul>
    </div>
  );
}
