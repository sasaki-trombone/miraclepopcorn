import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
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

type Content = {
	id: string;
	title: string;
};

export async function loader({ context }: LoaderFunctionArgs) {
	const env = context.cloudflare.env as Env;
	const data = await microcmsClient({
		serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
		apiKey: env.MICROCMS_API_KEY,
	}).getList<Content>({
		endpoint: "articles",
		queries: { fields: "id,title" },
	});
	return json(data);
}

export default function Index() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="font-sans p-4">
			<h1 className="text-3xl">miracle popcorn</h1>
			<ul className="list-disc mt-4 pl-6 space-y-2">
				<li>
					{data.contents.map((article) => (
						<div key={article.id}>{article.title}</div>
					))}
				</li>
			</ul>
		</div>
	);
}
