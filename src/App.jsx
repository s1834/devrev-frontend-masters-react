import { createRoot } from "react-dom/client";
import Pizza from "./Pizza.jsx";

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

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      <Pizza
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
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
