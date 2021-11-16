import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import classes from "../../styles/Result.module.css";
import Result from "../../components/result/Result";

const Results = () => {
  const router = useRouter();
  const { session_id } = router.query;

  const { data, error } = useSWR(
    session_id ? `/api/checkout/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <div>
      {!data && !error && "...Loading"}
      {data && <Result data={data} />}
      {error && !data && "Error"}

      {/* <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre> */}
    </div>
  );
};

export default Results;
