import { useContext } from "react";
import { CarrinhoContext } from "../carrinho.js";
import { Link } from "react-router-dom";

export function CarrinhoPage() {
  const carrinho = useContext(CarrinhoContext);

  return (
    <>
      <div className="ml-40 mt-10">
        <div className="row float: right">
          <Link to="/productlist">
            <button
              type="submit"
              className="relative mb-5 block w-25 py-2 content-center text-white bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 border rounded uppercase font-roboto font-medium"
            >
              Continue Shopping
            </button>
          </Link>
          {carrinho.tea.map((currentTea) => {
            return (
              <div>
                <h1>{currentTea.name}</h1>
                <div>
                  <img
                    className="tracking-tight text-gray-800 text-3xl mt-5 mb-6 font-mono font-400 flex justify-center"
                    src={currentTea.image}
                    alt="Tea"
                    style={{ width: "350px", height: "350px" }}
                  />
                </div>
                <p className="text-xl font-medium font-mono font-style: italic text-gray-900 mt-4 mb-3">
                  US$ {currentTea.price} per 100 grams
                </p>
              </div>
            );
          })}
        </div>
        <Link to="/payment">
          <button
            type="submit"
            className="relative block w-25 py-2 content-center text-white bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 border rounded uppercase font-roboto font-medium"
          >
            Checkout
          </button>
        </Link>
      </div>
    </>
  );
}
