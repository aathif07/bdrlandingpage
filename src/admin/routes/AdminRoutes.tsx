
import { Routes, Route } from 'react-router-dom';
import BlogCategories from '../pages/BlogCategories';
import BlogCategoryForm from '../pages/BlogCategoryForm';
import BlogsPage from '../pages/BlogsPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="blogs" element={<BlogsPage />} />
      <Route path="blog-categories" element={<BlogCategories />} />
      <Route path="blog-categories/new" element={<BlogCategoryForm />} />
      <Route path="blog-categories/edit/:id" element={<BlogCategoryForm />} />
    </Routes>
  );
};

export default AdminRoutes;
