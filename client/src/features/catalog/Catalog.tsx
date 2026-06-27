import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";


export default function Catalog() {
  const { data, isLoading, isError } = useFetchProductsQuery();

  if (isLoading || !data) return <h2>Cargando...</h2>
  if (isError) return <h2>Error al cargar los productos</h2>

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
