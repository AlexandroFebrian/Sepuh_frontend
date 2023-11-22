import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import fetch from "../../Client/fetch";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from "react";

export default function SignInViewModel(){
  const { signIn, signUp } = fetch()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [wait, setWait] = useState(false)

  /**
   * SCHEMA
   */
  const signUpSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "Username can not be empty",
      "string.email": "Invalid email format"
    }),
    name: Joi.string().required().messages({
      "string.empty": "Name can not be empty"
    }),
    password: Joi.string().min(8).max(16).required().messages({
      "string.empty": "Password can not be empty",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 16 characters"
    }),
    confirm: Joi.string().min(8).max(16).required().valid(Joi.ref("password")).messages({
      "string.empty": "Confirm Password can not be empty",
      "any.only": "Confirm Password does not match",
      "string.min": "Confirm Password must be at least 8 characters",
      "string.max": "Confirm Password must be at most 16 characters"
    }),
    role: Joi.string().valid("Freelancer", "Company").required().messages({
      "string.empty": "Role can not be empty",
      "any.only": "Role must be Freelancer or Company"
    }),
    terms: Joi.boolean().valid(true).required().messages({
      "any.only": "You must agree to the terms and conditions"
    }),
  })
  
  const signInSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "Username can not be empty",
      "string.email": "Invalid email format"
    }),
    password: Joi.string().min(8).max(16).required().messages({
      "string.empty": "Password can not be empty",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 16 characters"
    }),
  })

  /**
   * FORM
   */
  const {register: signUpForm, handleSubmit: handleSignUp, formState: {errors: signUpError}} = useForm({
    resolver: joiResolver(signUpSchema)
  });
  const {register: signInForm, handleSubmit: handleSignIn, formState: {errors: signInError}} = useForm({
    resolver: joiResolver(signInSchema)
  });

  /**
   * FUNCTION
   */
  async function submitSignUp(data){
    // data.email
    // data.name
    // data.password
    // data.confirm
    // data.role
    // data.terms

    setWait(true)

    const result = await signUp(data)

    console.log(result)
  }

  async function submitSignIn(data){
    // data.email
    // data.password

    // const result = await signIn(data)

    console.log(data)
    dispatch(setIsLogin(true))
    navigate("/home")

  }

  return {
    signUpForm,
    signInForm,
    signUpError,
    signInError,
    handleSignUp,
    handleSignIn,
    submitSignUp,
    submitSignIn,
    wait
  }
}

