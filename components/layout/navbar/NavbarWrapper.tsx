import React from 'react';
import { getAllCategories } from '@/data/repository/ProductRepository';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
  const categories = await getAllCategories();

  return <Navbar categories={categories} />;
}
