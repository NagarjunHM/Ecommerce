import React from "react";
import { Slider, Checkbox, Loader, CheckboxGroup } from "rsuite";
import { useProductContext } from "../contexts/productContextProvider";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContextProvider";

const Home = () => {
  const {
    products,
    loader,
    category,
    setSearch,
    price,
    setPrice,
    handleCheckBoxInput,
    handleAddTOCartButton,
  } = useProductContext();
  const { username } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      {loader ? (
        <div className="w-[100vw] h-[92.9vh]  bg-transparent">
          <Loader size="lg" center content="Loading..." />
        </div>
      ) : (
        <div className="flex flex-row ">
          {/* side bar */}

          <div className="w-[300px] mt-2 rounded  hidden md:flex z-1  ">
            <div className="fixed pr-10 ml-3  h-[100%] overflow-auto">
              <div className="m-2 text-xl ">Filter</div>
              <hr />
              <div className="my-5 ml-2 w-[150px]">
                <div className="mb-2">Price : {price}</div>
                <Slider
                  progress
                  min={0}
                  defaultValue={0}
                  max={2000}
                  default={0}
                  step={100}
                  tooltip={false}
                  onChange={(value) => setPrice(value)}
                />
              </div>
              <div className="m-2 text-xl">Category</div>
              <hr />
              <div className="flex flex-col ">
                <CheckboxGroup>
                  {category.map((category) => (
                    <Checkbox
                      key={category}
                      value={category}
                      onChange={(value) => {
                        handleCheckBoxInput(value);
                      }}
                    >
                      {category}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </div>
          </div>

          {/* main content */}
          <div className=" w-[100vw] left-[200px] ">
            {/* search bar */}
            <div className="text-center">
              <form
                onInput={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="string"
                  placeholder="Search items"
                  className="p-3 w-[390px] my-5 border mx-auto border-slate-500 rounded"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
            </div>

            {/* rendering the cards */}
            <div className="flex flex-wrap justify-center">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className=" border flex flex-col w-[280px] rounded border-slate-400 m-2"
                >
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="h-[190px] rounded-t object-contain"
                  />
                  <div className="mx-3 mt-3 mb-1 text-xl truncate">
                    {prod.title}
                  </div>
                  <div className="m-1 mx-3 text-xl text-green-700">
                    $ {prod.price}
                  </div>
                  <button
                    className="py-2 px-3 m-3 rounded bg-blue-300  cursor-pointer active:scale-[0.9] duration-200 border border-slate-900"
                    onClick={() => {
                      if (username === "") {
                        navigate("/login");
                        return;
                      }
                      handleAddTOCartButton(prod);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
