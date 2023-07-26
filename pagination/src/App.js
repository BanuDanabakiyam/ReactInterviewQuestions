import React, { useEffect, useState } from "react";
import "./style.css";

function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAllProducts = async () => {
      const response = await fetch (`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
      const data = await response.json();

      if( data && data.products) {
        setProducts(data.products);
        setTotalPages(data.total / 10);

      }
  };
     useEffect(() => {
      fetchAllProducts();
     },[page]);

     const selectPageHandler = (selectedPage) => {
      console.log(selectPageHandler);
      if(
        selectedPage >= 1 &&
        selectedPage <= totalPages &&
        selectedPage !== page
      )
      setPage(selectedPage);
     }

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return <span className="products__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title}/>
              <span>{product.title}</span>
            </span>
          })}
        </div>
      )}
      {products.length > 0 && (<div className="pagination">
        
        <span onClick={() => selectPageHandler(page - 1)}
        className={page > 1 ? "" : "pagination__disabled"}

        >◀</span>
        {[...Array(totalPages)].map((_,i) => {
          return <span
          className={page === i + 1 ? "pagination__selected" : ""}
          onClick={() => selectPageHandler(i + 1)} key={i}>{i + 1}</span>
        })}
        <span onClick={() => selectPageHandler(page + 1)}
        className={page < totalPages? "" : "pagination__disabled"}
        >▶</span>
      </div>

      )}
      
    </div>
  );
}

export default App;
