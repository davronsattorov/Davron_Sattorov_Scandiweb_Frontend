import Category from "../pages/categories-page/Category";
import Product from "../pages/product-page/Product";
import Cart from "../pages/cart-page/Cart";

export default [
  {
    component: Category,
    path: "/categories",
    title: "Categories",
    children: [],
  },
  {
    component: Product,
    path: "/product",
    title: "Product",
    children: [],
  },
  {
    component: Cart,
    path: "/cart",
    title: "Cart",
    children: [],
  },
].map((route) => ({
  ...route,
  path: `/home${route.path}`,
  id: Math.random() + new Date().getTime(),
}));
