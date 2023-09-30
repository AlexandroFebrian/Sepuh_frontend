import { useForm } from "react-hook-form";

export default function SignInViewModel(){
  const {register: signUp, handleSubmit: handleSignUp} = useForm();
  const {register: signIn, handleSubmit: handleSignIn} = useForm();

  const submitSignUp = (data) => {
    // data.emailSignUp
    // data.usernameSignUp
    // data.passwordSignUp
    // data.confirmSignUp

    console.log(data)
  }

  const submitSignIn = (data) => {
    // data.emailSignIn
    // data.passwordSignIn

    console.log(data)
  }

  return {
    signUp,
    signIn,
    handleSignUp,
    handleSignIn,
    submitSignUp,
    submitSignIn,
  }
}

