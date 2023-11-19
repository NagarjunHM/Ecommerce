import React from "react";
import { Loader } from "rsuite";
import { useProductContext } from "../contexts/productContextProvider";

const Order = () => {
  const { orderedProducts, loader } = useProductContext();

  if (loader) {
    return <Loader size="lg" center backdrop />;
  }

  return (
    <>
      {!orderedProducts || Object.keys(orderedProducts).length === 0 ? (
        <div className="my-10 text-3xl text-center">No Orders Yet</div>
      ) : (
        <div>
          <div className="m-10">
            {Object.keys(orderedProducts).map((timestampKey, index) => {
              const timestamp = orderedProducts[timestampKey];
              const orderTime = new Date(
                parseInt(timestampKey)
              ).toLocaleString();

              // Calculate the grand total for each order
              const grandTotal = Object.values(timestamp).reduce(
                (total, item) => {
                  return total + parseFloat(item.total); // Ensure item.total is treated as a number
                },
                0
              );

              return (
                <div
                  key={timestampKey}
                  className={`mb-8 ${
                    index !== 0 ? "mt-8" : ""
                  } shadow border border-slate-700  `}
                >
                  <h3 className="text-lg font-semibold text-center bg-slate-300">
                    Ordered Time: {orderTime}
                  </h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-100 border border-slate-500">
                          Product
                        </th>
                        <th className="px-6 py-3 bg-gray-100 border border-slate-500">
                          Price
                        </th>
                        <th className="px-6 py-3 bg-gray-100 border border-slate-500">
                          Quantity
                        </th>
                        <th className="px-6 py-3 bg-gray-100 border border-slate-500">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(timestamp).map((itemKey) => {
                        const item = timestamp[itemKey];
                        return (
                          <tr key={itemKey} className="border border-slate-500">
                            <td className="px-6 py-4 border whitespace-nowrap border-slate-500">
                              {item.title}
                            </td>
                            <td className="px-6 py-4 border whitespace-nowrap border-slate-500">
                              ${item.price}
                            </td>
                            <td className="px-6 py-4 border whitespace-nowrap border-slate-500">
                              {item.qty}
                            </td>
                            <td className="px-6 py-4 border whitespace-nowrap border-slate-500">
                              ${item.total}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="m-4 mr-10 text-right">
                    <strong className="text-green-600">
                      Grand Total: ${grandTotal.toFixed(2)}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
