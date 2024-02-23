import "./App.css";
import ProductsViewMore from "./components/productsviewmore";

function App() {
  let limit = 20;
  return (
    <div className="App">
      <ProductsViewMore limit={limit} />
    </div>
  );
}

export default App;
