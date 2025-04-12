import useSWR from "swr";

import MainLayout from "../layouts/MainLayout";
import fetcher from "../lib/fetcher";

function ListPage() {
	const { data, error } = useSWR("/surveys", fetcher);
	console.log(data);
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div>
			<MainLayout selectedKey="list">
				<h1>Survey List</h1>
			</MainLayout>
		</div>
	);
}

export default ListPage;
