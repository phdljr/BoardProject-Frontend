import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./component/header/Header";
// import Footer from './component/footer/Footer'
import EmptyPage from "./page/Empty/EmptyPage";
import MainPage from "./page/Main/MainPage";
import BoardListPage from "./page/BoardList/BoardListPage";
import LoginPage from "./page/Login/LoginPage";
import RegisterPage from "./page/Register/RegisterPage";
import BoardPage from "./page/Board/BoardPage";
import MyPage from "./page/MyPage/MyPage";

// export default const App = () => {} 이거랑 같음
export default function App() {
  return (
    <BrowserRouter>
      {/* Routes 외부에선 모든 페이지에서 다 나옴 */}
      <Header />
      {/* Routes 내부에선 페이지마다 다르게 보여짐 */}
      <Routes>
        <Route
          element={
            <Container>
              <Outlet />
            </Container>
          }
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<EmptyPage />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
