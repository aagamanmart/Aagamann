import React from 'react';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { StoreProvider, useStore } from './context/StoreContext';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';
import { FaqPage, PolicyPage, SupportPage } from './pages/SupportPages';

const AppRouter: React.FC = () => {
  const { route } = useStore();
  const path = route.split('?')[0];

  if (path.startsWith('/admin')) {
    return <AdminPage />;
  }

  let page: React.ReactNode = <HomePage />;
  if (path === '/shop' || path.startsWith('/category/')) {
    page = <ShopPage />;
  } else if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').split('/')[0];
    page = <ProductDetailPage slug={slug} />;
  } else if (path === '/checkout') {
    page = <CheckoutPage />;
  } else if (path === '/account') {
    page = <AccountPage />;
  } else if (path === '/support') {
    page = <SupportPage />;
  } else if (path === '/faq') {
    page = <FaqPage />;
  } else if (path.startsWith('/policy/')) {
    const type = path.replace('/policy/', '').split('/')[0];
    page = <PolicyPage type={type} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Navbar />
      <div className="flex-1">{page}</div>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <CompareModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
