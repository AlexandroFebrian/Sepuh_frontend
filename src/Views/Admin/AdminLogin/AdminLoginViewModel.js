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
      checkToken();
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin/masteruser";
    }
  };

  return {
    Login,
  };
}
