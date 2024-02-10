import { AuthProvider } from "../contexts/AuthContxt";
import SignUpPage from "./SignUpPage";

function App() {
  return (
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  )
}

export default App
