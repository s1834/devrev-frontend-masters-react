import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
// import Pizza from "./Pizza.jsx";
// import PizzaOfTheDay from "./PizzaOfTheDay.jsx";
// import Order from "./Order.jsx";
// import Header from "./Header.jsx";
// import { CartContext } from "./contexts.jsx";
// import Cart from "./Cart.jsx";

// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

// const App = () => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h1", {}, "Padre Gino's"),
//     React.createElement(Pizza, {
//       name: "The Pepperoni Pizza",
//       description: "Mozzarella Cheese, Pepperoni",
//     }),
//   );
// };

const router = createRouter({
  routeTree,
});
const queryClient = new QueryClient();

const App = () => {
  // const cartHook = useState([]);
  return (
    <StrictMode>
      {/* <CartContext.Provider value={cartHook}> */}
      {/* <div> */}
      {/* <h1 className="logo">Padre Gino's - Order Now</h1> */}
      {/* <Pizza
        name="The Pepperoni Pizza"
        description="pep, cheese, n stuff"
        image={"/public/pizzas/pepperoni.webp"}
        />
        <Pizza
        name="The Hawaiian Pizza"
        description="ham, pinapple, n stuff"
        image={"/public/pizzas/hawaiian.webp"}
        />
        <Pizza
        name="The Plain Cheese Pizza"
        description="just cheese, n stuff"
        image={"/public/pizzas/big_meat.webp"}
        /> */}
      {/* <Header />
          <Order />
          <PizzaOfTheDay />
          </div>
          </CartContext.Provider> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
