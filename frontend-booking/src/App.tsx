import { useEffect, useState } from 'react';

import BaseLayout from './components/layouts/baseLayout';
import AdminLayout from './components/layouts/adminLayout';
import { Route, Routes } from 'react-router-dom';
import { IProduct } from './interfaces/product';
import { getAll, remove, create, update } from './api/product';
import AdminProductPage from './pages/AdminProductPage';
import Signin from './pages/Signin';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminUpdateProduct from './pages/AdminUpdateProduct';
import Signup from './pages/Signup';
import ProductPage from './pages/Product';
import ProductDetailPage from './pages/ProductDetail';

function App() {
  const [products, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAll();
      setProduct(data.products);
    })();
  }, []);
  const onHandleAdd = async (product) => {
    try {
      const { data } = await create(product);
      setProduct([...products, data.product]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await remove(id);
      const { data } = await getAll();
      setProduct(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  const onHandleUpdate = async (product) => {
    try {
      await update(product);
      const { data } = await getAll();
      setProduct(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={'Home Page'} />
          <Route path='products'>
            <Route index element={<ProductPage products={products} />} />
            <Route
              path=':id'
              element={<ProductDetailPage products={products} />}
            />
          </Route>

          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminLayout />} />
          <Route path='products'>
            <Route
              index
              element={
                <AdminProductPage products={products} Remove={removeItem} />
              }
            />
            <Route
              path='add'
              element={<AdminAddProduct onAdd={onHandleAdd} />}
            />
            <Route
              path=':id/update'
              element={
                <AdminUpdateProduct
                  onUpdate={onHandleUpdate}
                  products={products}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
