import { useRouter } from "next/router";
import useSWR from "swr";

const Result = () => {
  const router = useRouter();
  const { session_id } = router.query;

  const { data, error } = useSWR(
    session_id ? `/api/checkout/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <h1>Payment Result</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
};

export default Result;
