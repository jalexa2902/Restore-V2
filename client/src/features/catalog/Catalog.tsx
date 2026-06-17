import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";


export default function Catalog() {
  const { data, isLoading, isError } = useFetchProductsQuery();

  if (isLoading || !data) return <h2>Loading...</h2>
  if (isError) return <h2>Error loading products</h2>

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
