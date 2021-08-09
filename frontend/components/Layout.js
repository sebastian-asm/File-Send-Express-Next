import Header from '../components/Header';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <Header />
        <main className="mt-20">{children}</main>
      </div>
    </div>
  );
}
