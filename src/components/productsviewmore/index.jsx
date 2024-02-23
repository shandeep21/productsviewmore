import { useState, useEffect } from "react";
import "./styles.css";

export default function ProductsViewMore(props) {
  const { limit } = props;
  const [products1, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  async function fetchProducts() {
    try {
      setLoading(true);
      let response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      let result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result?.products]);
        console.log(">>>", result);
        setLoading(false);
        if (result?.skip === result?.total - limit) {
          setDisableButton(true);
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) {
    return <div>Loading data! please wait</div>;
  }

  return (
    <div className="container">
      <div className="image-container">
        {products1.map((prod, index) => (
          <div key={`${prod.id}-${index}`} className="imagegrid">
            <img
              src={prod.thumbnail}
              alt={prod.title}
              style={{ width: "200px", height: "200px" }}
            />
            <p>{prod?.title}</p>
          </div>
        ))}
      </div>
      {!disableButton ? (
        <button
          style={{ padding: "10px", paddingTop: "10px" }}
          onClick={() => setCount(count + 1)}
        >
          view more.....
        </button>
      ) : null}
    </div>
  );
}
