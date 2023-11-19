import {
  onSnapshot,
  doc,
  setDoc,
  deleteField,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createContext, useState, useEffect, useContext } from "react";
import { useUserContext } from "./userContextProvider";
import { CustomToaster } from "../utilities/Toaster";

export const productContext = createContext();

// custom product hook
export function useProductContext() {
  return useContext(productContext);
}

// custom provider
const CustomProductContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [constProducts, setConstProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [checkedProduct, setCheckedProduct] = useState([]);
  const { username } = useUserContext();
  const [cartProducts, setCartProducts] = useState({});
  const [orderedProducts, setOrderedProducts] = useState({});

  // getting the product detail on mount
  useEffect(() => {
    setLoader(true);
    const unsub = onSnapshot(doc(db, "BusyBuy", "Allproducts"), (doc) => {
      setProducts(JSON.parse(doc.data().products));
      setConstProducts(JSON.parse(doc.data().products));
      setLoader(false);
      return () => {
        unsub();
      };
    });
  }, []);

  // getting all the details of the products in cart
  useEffect(() => {
    if (username !== "") {
      setLoader(true);
      const unsub = onSnapshot(doc(db, "cart", username), (doc) => {
        setCartProducts(doc.data());
        setLoader(false);
        return () => {
          unsub();
        };
      });
    }
  }, [username]);

  // useEffect to fetch all order details of the particular user
  useEffect(() => {
    if (username !== "") {
      setLoader(true);
      const unsub = onSnapshot(doc(db, "order", username), (doc) => {
        setOrderedProducts(doc.data());
        setLoader(false);
        return () => {
          unsub();
        };
      });
    }
  }, [username]);

  // increasing the item count in the cart
  const handleIncreaseCartItem = async (id) => {
    let product = { ...cartProducts };
    product[id].qty = ++product[id].qty;
    product[id].total = product[id].qty * product[id].price;
    // setCartProducts({ ...product });
    await setDoc(doc(db, "cart", username), product);
  };

  // decreasing the item count in the cart
  const handleDecreaseCartItem = async (id) => {
    let product = { ...cartProducts };
    if (product[id].qty > 1) {
      product[id].qty = --product[id].qty;
      product[id].total = product[id].qty * product[id].price;
    }
    // setCartProducts({ ...product });
    await setDoc(doc(db, "cart", username), product);
  };

  // function to handle cart delete items
  const handleAllCartItemDelete = async () => {
    // await deleteDoc(doc(db, "cart", username));
    const fieldsToDelete = {};
    Object.keys(cartProducts).map((key) => {
      return (fieldsToDelete[key] = deleteField());
    });
    await updateDoc(doc(db, "cart", username), fieldsToDelete);
  };

  //Deleting an item from the cart
  const handleCartItemDelete = async (id, title) => {
    await updateDoc(doc(db, "cart", username), { [id]: deleteField() });
    CustomToaster(`${title} deleted from cart`, "warning");
  };

  // function to handle order place
  const handleOrderPlace = async () => {
    let timestamp = new Date().getTime();
    let tempOrder = {
      [timestamp]: cartProducts,
    };
    await setDoc(doc(db, "order", username), tempOrder, { merge: true });
    handleAllCartItemDelete();
    CustomToaster("Order Placer", "success");
  };

  //looping through products to create a dynamic category
  let category = constProducts.map((prod) => prod.category);
  category = [...new Set(category)];

  // function to search item based search input,price
  useEffect(() => {
    let filteredProducts = constProducts.slice(); // Create a copy to avoid overwriting original data

    // Apply search filter
    if (search.trim() !== "") {
      filteredProducts = filteredProducts.filter((prod) => {
        return prod.title
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(search.toLowerCase().replaceAll(" ", ""));
      });
    }

    // Apply price filter (if price is greater than 0)
    if (price > 0) {
      filteredProducts = filteredProducts.filter((prod) => {
        return prod.price < price;
      });
    }

    // Apply checkbox filter (if checkboxes are checked)
    if (checkedProduct.length > 0) {
      filteredProducts = filteredProducts.filter((prod) => {
        return checkedProduct.includes(prod.category);
      });
    }

    setProducts(filteredProducts);
  }, [search, price, checkedProduct]);

  // Function to reset filters
  const resetFilters = () => {
    setSearch(""); // Clear the search input
    setPrice(0); // Reset the price filter
    setCheckedProduct([]); // Clear selected checkboxes
  };

  // function to retreive all selected checkbox value
  function handleCheckBoxInput(category) {
    let temp = [...checkedProduct];
    if (temp.includes(category)) {
      temp = temp.filter((item) => {
        return item !== category;
      });
      setCheckedProduct([...temp]);
      return;
    }
    setCheckedProduct([...temp, category]);
    // console.log(checkedProduct);
  }

  const handleAddTOCartButton = async (prod) => {
    if (cartProducts[prod.id]) {
      CustomToaster(`${prod.title} already exists in the cart`, "info");
      return;
    }

    // Make a copy of the current cartProducts state
    const updatedCart = { ...cartProducts };
    prod.qty = 1;
    prod.total = [prod.price];
    updatedCart[prod.id] = prod;
    setCartProducts(updatedCart); // Update the cart state
    await setDoc(doc(db, "cart", username), updatedCart, { merge: true });
    CustomToaster(`${prod.title} added to the cart`, "success");
  };

  return (
    <productContext.Provider
      value={{
        products,
        loader,
        category,
        setSearch,
        price,
        setPrice,
        handleCheckBoxInput,
        checkedProduct,
        setCheckedProduct,
        handleAddTOCartButton,
        cartProducts,
        setCartProducts,
        handleCartItemDelete,
        handleDecreaseCartItem,
        handleIncreaseCartItem,
        handleOrderPlace,
        orderedProducts,
        resetFilters,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default CustomProductContext;
