import fetch from "../../../Client/fetch";

export default function AdminViewModel() {
  const { checkToken, handleAdminLogin } = fetch();

  const Login = async (username, pw) => {
    const data = {
      username: username,
      password: pw,
    };

    const res = await handleAdminLogin(data);
    if (res.status === 200) {
      console.log("Login Success");
      // checkToken();
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin/dashboard";
    }
  };

  return {
    Login,
  };
}
