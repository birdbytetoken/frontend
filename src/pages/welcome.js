import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Input from '../components/input'
import validateForm from '../utils/validateRegisterForm'
import { useAppContext } from '../context/state'
import { useLocation } from 'react-router-dom'
const { api } =require('../config')

const initialState = {
  referrerID: "",
  email: "",
  telegramName: "",
  password: "",
  cpassword: ""
}

const initialErrorState = {
  errors: false,
  email: "",
  telegramName: "",
  password: "",
  cpassword: ""
}

export default function Welcome() {
  const [login, setLogin] = useState(false)
  const [data, setData] = useState(initialState)
  const [verifyId, setVerifyId] = useState("")
  const [errors, setErrors] = useState(initialErrorState)
  const [msg, setMsg] = useState({msg: "", msgType: ""})
  const [loginMsg, setLoginMsg] = useState({msg: "", msgType: ""})
  const [verifyMsg, setVerifyMsg] = useState({msg: "", msgType: ""})
  const [loading, setLoading] = useState(false)
  const [, setSharedState] = useAppContext()
  const search = useLocation().search;
  const referrer = new URLSearchParams(search).get("referrer");
  const verifyEmailId = new URLSearchParams(search).get("verifyEmailId");

  const verifyEmail = async () => {
    setLoading(true)
    setVerifyMsg({msg: "", msgType: ""})

    if (verifyEmailId) {
      try {
        const res = await(await fetch(`${api}/users/verify-email?verifyId=${verifyEmailId}`, {
          method: 'POST'
        })).json()

        setTimeout(() => {
          setLoading(false)
          if (!res.success) {
            setVerifyMsg({msg: res.message, msgType: "red"})
            return
          }
          
          setVerifyMsg({msg: res.message, msgType: "green"})
        }, 3000);
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    } else {
      setLoading(false)      
    }
  }

  useEffect(() => {
    if (referrer)
      setData({ ...data, referrerID: referrer.toString().trim() })
    
    setVerifyId(verifyEmailId)
    verifyEmail()
  }, [referrer, verifyEmailId])

  const toggleLogin = (val) => (e) => {
    e.preventDefault();
    setLogin(val);
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
    
    const errors = validateForm(name, value, data.password)
    if (
        errors &&
        Object.keys(errors).length > 0 &&
        errors.constructor === Object
    ) {
      setErrors(errors)
        if (errors.error) {
            return
        }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return
    setMsg({msg: "", msgType: ""})
    setLoading(true)

    try {
      const res = await(await fetch(`${api}/users/login? ${new URLSearchParams(data)}`, {
        method: 'POST'
      })).json()
      setTimeout(() => {
        setLoading(false)

        if (!res.success) {
          const errmsg = res.message ? res.message : "Invalid login credentials"
          setLoginMsg({ msg: errmsg, msgType: "red" })
          return
        }
        
        setSharedState({ user: res.data.user, userToken: res.data.token });
        setLoginMsg({ msg: "Login successful", msgType: "green" });
        setData(initialState);
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000);
      }, 2000);

    } catch (error) {
      setLoading(false)
      setLoginMsg({msg: "Invalid login credentials", msgType: "red"})
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return
    setMsg({msg: "", msgType: ""})
    setLoading(true)

    let checkErrors = {}
    for (let key in data) {
      const res = validateForm(key, data[key], data.password)
      checkErrors = { ...checkErrors, ...res }
    }

    if (
        checkErrors &&
        Object.keys(checkErrors).length > 0 &&
        checkErrors.constructor === Object
    ) {
      setErrors(checkErrors)
      if (checkErrors.error) {
        setLoading(false)
            return
      }
    }

    try {
      const res = await (await fetch(`${api}/users/create`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
      })).json()
      setLoading(false)

      if (!res.success) {
        if (res.data.length > 0) {
          const errors = {}
          res.data.forEach(err => {
            errors[err.param] = err.msg
          })
  
          setErrors(errors)
        }
        return
      }
      
      setData(initialState)
      setMsg({msg: "Verification mail has been sent to you", msgType: "green"})
    } catch (error) {
    setLoading(false)
    console.log({error});
    }
  }

  return (
    <Layout>
        <div className="w-full px-4">
        <div className="md:pt-32 sm:pt-0">
          {!verifyId && (
            <h2 className="text-center font-semibold text-3xl text-white">
                Fill the form below to get free BirdByte Airdrop.
            </h2>

          )}
          <div className="mt-12">
            {!verifyId && 
          <div className="text-center font-semibold text-2xl text-white">
               <a className={!login && 'text-blueGray-400'} href="!#" onClick={toggleLogin(false)}>Register</a> | <a className={login && 'text-blueGray-400'} href="!#" onClick={toggleLogin(true)}>Login</a>
            </div>
            }
            
            <div class="flex content-center items-center justify-center h-full mt-4">
              <div class="w-full lg:w-6/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-glass border-0"
                >
                  {verifyId ? (
                    <div className="flex-auto px-4 lg:px-10 py-10">
                      <h3 className="text-center p-4 pt-0 font-semibold text-2xl">Verify email</h3>

                      {verifyMsg.msgType == 'green' && 
                      <div className="text-center m-8">
                          <span className="fas fa-user-check text-5xl block"></span>
                            
                      </div>
                      }
                      
                      {verifyMsg.msg &&
                        <small className={`text-${verifyMsg.msgType}-500 text-center block mb-8 text-lg font-semibold mt-2`}>
                          {verifyMsg.msg}</small>
                      }

                      {loading && <div className="text-center">
                        <span className="fas fa-spinner animate-spin text-4xl block"></span>
                      </div>}
                      
                      {!loading && (
                        <div>

                      <div class="text-center mt-6">
                        <button
                          class="btn text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            toggleLogin(true)
                            setVerifyId("")
                          }
                          }
                        >
                          Continue to login
                        </button>
                      </div>
                        </div>

                      )}
                    </div>
                  ): (
                    
                  <div class="flex-auto px-4 lg:px-10 py-10">
                    {login ? (
                    
                          <form onSubmit={handleLogin}>
                                                  {loading && <div className="text-center">
                        <span className="fas fa-spinner animate-spin text-4xl block"></span>
                      </div>}
                        {loginMsg.msg &&
                        <small className={`text-${loginMsg.msgType}-500 text-center block mb-8 text-sm font-semibold`}> {loginMsg.msg}</small>
                        }
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                          Email 
                        </label>
                          <Input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={data.email}
                          placeholder="email"
                        />
                      </div>

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                          Password 
                        </label>
                          <Input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={data.password}
                          placeholder="password"
                        />
                      </div>

                            <div class="text-center mt-6">
                              <a href="/recoveraccount?request=true" className="text-left text-red-400 block w-full">forgot password?</a>
                              
                        <button
                              class={`btn text-whie text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-6 ease-linear transition-all duration-150 ${loading && "opacity-50"}`}
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>

                    ): (

                        <form onSubmit={handleRegister}>
                          {msg.msg && 
                          <small className="text-green-500 block mb-8 text-sm font-semibold capitalize"> {msg.msg}</small>
                          }
                          
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Referrer Code
                        </label>
                        <Input
                              name="referrerID"
                          placeholder="referrer code"
                              value={data.referrerID}
                              onChange={handleChange}
                              readOnly={true}
                        />
                      </div>

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Email
                              {errors.email && (
                                <small className="text-red-500 lowercase text-xs font-semibold"> *Email {errors.email}</small>

                              )}
                        </label>
                        <Input
                              type="email"
                              name="email"
                          placeholder="email"
                              value={data.email}
                              onChange={handleChange}
                        />
                      </div>

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Telegram Username
                              {errors.telegramName && (
                                <small className="text-red-500 lowercase text-xs font-semibold"> *Telegram username {errors.telegramName}</small>

                              )}
                        </label>
                        <Input
                          name="telegramName"
                          placeholder="telegram username"
                          value={data.telegramName}
                          onChange={handleChange}
                        />
                      </div>

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Password
                              {errors.password && (
                                <small className="text-red-500 lowercase text-xs font-semibold"> *Password {errors.password}</small>

                              )}
                        </label>
                        <Input
                              type="password"
                              name="password"
                          placeholder="password"
                              value={data.password}
                              onChange={handleChange}
                        />
                      </div>

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Confirm Password 
                              {errors.cpassword && (
                                <small className="text-red-500 lowercase text-xs font-semibold"> *{errors.cpassword}</small>

                              )}
                        </label>
                        <Input
                              type="password"
                              name="cpassword"
                          placeholder="confirm password"
                              value={data.cpassword}
                              onChange={handleChange}
                        />
                      </div>

                      <div class="text-center mt-6">
                        <button
                              class={`btn text-whie text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${errors.error || loading && "opacity-50"}`}
                              type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </form>

                    )}
                  </div>
  )}
                </div>
              </div>
            </div>
            

          </div>
          </div>
        </div>

    </Layout>
  )
}
