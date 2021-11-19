import classes from "./OrderHistory.module.css";
import Image from "next/image";
import { formatPrice } from "../../../utils/text";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaReceipt } from "react-icons/fa";
import router from "next/router";
const OrderHistory = ({ orders }) => {
  const [contentVisible, setContentVisible] = useState([]);
  useEffect(() => {
    if (orders) {
      let vis = [];
      orders.forEach(() => {
        vis.push(false);
      });
      setContentVisible(vis);
    }
  }, [orders]);

  const handleGotoShop = () => {
    router.push("/shop");
  };

  const toggleVisibility = (index) => {
    setContentVisible((contentVisible) =>
      contentVisible.map((vis, i) => (index === i ? !vis : vis))
    );
  };

  return (
    <div>
      <h2>Order History</h2>
      {orders?.length === 0 ? (
        <div>
          <div
            style={{ fontWeight: 600, fontSize: "1.2em", marginBottom: "1em" }}
          >
            You have not purchased anything yet!
          </div>
          <button className="mainbutton" onClick={handleGotoShop}>
            Go To Shop
          </button>
        </div>
      ) : (
        <div className={classes.orderlist}>
          {orders?.map((order, index) => {
            return order.products.length === 0 ? null : (
              <div key={order._id} className={classes.order}>
                <div className={classes.orderheader}>
                  <div
                    className={classes.orderlabelcontainer}
                    style={{ position: "relative" }}
                  >
                    <span className={`${classes.label} ${classes.orderlabel}`}>
                      Order
                    </span>{" "}
                    #{order._id}
                    <a
                      className={classes.receipt}
                      data-tip="View receipt"
                      href={order.receipt}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaReceipt size="1rem" />
                    </a>
                  </div>
                  <span className={classes.datelabelcontainer}>
                    <span className={`${classes.label} ${classes.datelabel}`}>
                      Date:
                    </span>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className={classes.itemlabelcontainer}>
                    <span className={`${classes.label} ${classes.itemlabel}`}>
                      Items:
                    </span>
                    {order.products.length}
                  </span>
                  <span className={classes.totallabelcontainer}>
                    <span className={`${classes.label} ${classes.totallabel}`}>
                      Total:
                    </span>
                    {formatPrice(order.total / 100)}
                  </span>

                  <button
                    onClick={() => toggleVisibility(index)}
                    className={`smallroundedbutton ${classes.downbutton}`}
                  >
                    {contentVisible[index] ? (
                      <AiOutlineUp />
                    ) : (
                      <AiOutlineDown />
                    )}
                  </button>
                </div>
                <div
                  className={`${classes.productlist} ${
                    contentVisible[index]
                      ? classes.productlistshown
                      : classes.productlisthidden
                  }`}
                >
                  <table
                  // className={`${classes.productlist} ${
                  //   contentVisible[index]
                  //     ? classes.productlistshown
                  //     : classes.productlisthidden
                  // }`}
                  >
                    <tbody>
                      {order.products.map((product) => (
                        <tr className={classes.product} key={product._id}>
                          <td className={classes.imagenamecontainer}>
                            <div className={classes.imagecontainer}>
                              <Image
                                className={classes.image}
                                height={500}
                                width={250}
                                src={product.background}
                              />
                            </div>
                            <div className={classes.contentcontainer}>
                              <div className={classes.title}>
                                {product.name}
                              </div>{" "}
                              <div className={classes.subtitle}>
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={classes.platform}>
                              {product.platform}
                            </span>
                          </td>
                          <td>
                            <span className={classes.price}>
                              {formatPrice(product.price)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
