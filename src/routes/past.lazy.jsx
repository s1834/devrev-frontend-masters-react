import { useState, Suspense, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ErrorBoundaryWrappedPastOrderRoutes(props) {
  const [page, setPage] = useState(1);

  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30_000,
  }).promise;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>LOADING Past Orders....</h2>
          </div>
        }
      >
        <PastOrdersRoute
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
          {...props}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrdersRoute({ page, setPage, loadedPromise }) {
  const [focusedOrder, setFocusedOrder] = useState(null);
  const data = use(loadedPromise);

  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <div className="past-orders">
      {data.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Date</td>
                <td>Time</td>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.order_id}>
                  <td>
                    <button
                      aria-label={`View order ${order.order_id}`}
                      onClick={() => setFocusedOrder(order.order_id)}
                    >
                      {order.order_id}
                    </button>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pages">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <div>{page}</div>
            <button
              disabled={data.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {focusedOrder && (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {isLoadingPastOrder ? (
            <p>Loading....</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intl.format(pizza.price)}</td>
                    <td>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
}
