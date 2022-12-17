import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import Main from './component/Main'

// export default const App = () => {} 이거랑 같음
export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}