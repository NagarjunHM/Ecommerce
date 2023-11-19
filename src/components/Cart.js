import { useProductContext } from "../contexts/productContextProvider";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartProducts,
    handleCartItemDelete,
    handleDecreaseCartItem,
    handleIncreaseCartItem,
    loader,
    handleOrderPlace,
  } = useProductContext();
  // console.log(cartProducts);
  let allItemTotal = 0;

  if (loader) {
    return <Loader size="lg" center backdrop />;
  }

  return (
    <>
      {!cartProducts || Object.keys(cartProducts).length === 0 ? (
        <div className="my-10 text-3xl text-center">No Items</div>
      ) : (
        <div className="relative ">
          <div className="w-full">
            {Object.keys(cartProducts).map((key) => {
              const product = cartProducts[key];
              allItemTotal += Number(product.total);

              return (
                <div
                  className="relative flex items-center m-10 border rounded border-slate-500 "
                  key={product.id}
                >
                  <div className="flex-1 hidden sm:flex">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-contain h-24 rounded w-36"
                    />
                  </div>
                  <div className="flex-1">{product.title}</div>
                  <div className="flex-1">
                    <button
                      className="px-3 py-1 m-1 mr-3 bg-green-500 rounded"
                      onClick={() => handleIncreaseCartItem(product.id)}
                    >
                      +
                    </button>
                    {product.qty}
                    <button
                      className="px-3 py-1 m-1 ml-3 bg-red-500 rounded"
                      onClick={() => handleDecreaseCartItem(product.id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="flex-1">{product.total}</div>
                  <button
                    className="absolute right-0 flex items-center h-full px-2 ml-10 bg-red-400 rounded-r cursor-pointer active:scale-[0.95] duration-200"
                    onClick={() =>
                      handleCartItemDelete(product.id, product.title)
                    }
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div className="fixed bottom-0 flex items-center w-full bg-white border h-14">
            <div className="absolute right-0 h-[100%] flex items-center px-10 text-xl  ">
              Total :
              <span className="text-2xl font-semibold">
                &nbsp; {allItemTotal}
              </span>
              <button
                className="bg-yellow-300 flex items-center px-3 mx-3 h-[100%] duration-200 active:bg-yellow-500 rounded"
                onClick={() => {
                  handleOrderPlace();
                  navigate("/order");
                }}
              >
                Place Order &gt;&gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
