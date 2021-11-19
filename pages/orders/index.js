import { getSession } from "next-auth/client";
import { useState } from "react";
import OrderHistory from "../../components/orders/OrderHistory/OrderHistory";
import { getOrdersFromApi } from "../api/orders";

const Orders = ({ session, orders }) => {
  const [parsedOrders, setParsedOrders] = useState(JSON.parse(orders));
  return (
    <div>
      {/* <pre>{JSON.stringify(parsedOrders, null, 2)}</pre> */}
      <OrderHistory orders={parsedOrders} />
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (!session)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    const orders = JSON.stringify(await getOrdersFromApi(session));
    // axios
    //   .get("/api/orders")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    return {
      props: { session, orders },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default Orders;
