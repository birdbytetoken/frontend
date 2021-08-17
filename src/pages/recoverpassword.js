import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Input from '../components/input'
import { useLocation } from 'react-router-dom'
const { api } =require('../config')

const initialState = {
  resetId: "",
  password: "",
  cpassword: "",
  email: ""
}

export default function RecoverPassword() {
  const [data, setData] = useState(initialState)
  const [verifyId, setVerifyId] = useState("")
  const [requestRecover, setRequestRecover] = useState(false)
  const [msg, setMsg] = useState({msg: "", msgType: ""})
  const [loading, setLoading] = useState(false)
  const search = useLocation().search;
  const resetId = new URLSearchParams(search).get("resetId");
  const request = new URLSearchParams(search).get("request");

  useEffect(() => {
    if (resetId)
      setData(prev => ({ ...prev, resetId: resetId.toString().trim() }))
    
    if (request)
      setRequestRecover(true)
    
    setVerifyId(resetId)
  }, [request, resetId])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }

  const handleRequest = async (e) => {
    e.preventDefault();
    if (loading) return
    setMsg({msg: "", msgType: ""})
    setLoading(true)

    try {
      const res = await(await fetch(`${api}/users/reset-password-request?email=${data.email}`, {
        method: 'get'
      })).json()
      setTimeout(() => {
        setLoading(false)

        if (!res.success) {
          setMsg({ msg: res.message, msgType: "red" })
          return
        }
        
        setMsg({ msg: res.message, msgType: "green" });
        setData(initialState);
      }, 2000);

    } catch (error) {
      setLoading(false)
      setMsg({ msg: "Could not reset password", msgType: "red" })
      console.log(error);
    }
  }

  const handleReset = async (e) => {
    e.preventDefault();
    if (loading) return
    setMsg({msg: "", msgType: ""})
    setLoading(true)

    if (data.password.length < 5) {
    setLoading(false)

      setMsg({ msg: "Password can not be less than 5 characters", msgType: "red" })
      return
    }

    if (data.password != data.cpassword) {
    setLoading(false)

      setMsg({ msg: "Password mismatch", msgType: "red" })
      return
    }

    try {
      const res = await (await fetch(`${api}/users/reset-password?resetId=${resetId}&password=${data.password}&cpassword=${data.cpassword}`, {
        method: 'get'
      })).json()
      setLoading(false)

      if (!res.success) {
        setMsg({msg: res.message, msgType: "red"})
        return
      }
      
      setData(initialState)
      setMsg({ msg: res.message, msgType: "green" })
      setTimeout(() => {
        window.location.href = "/welcome"
      }, 500);
    } catch (error) {
      setMsg({msg: "Could not reset password", msgType: "red"})
      setLoading(false)
    console.log({error});
    }
  }

  return (
    <Layout>
        <div className="w-full px-4">
        <div className="md:pt-32 sm:pt-0">
          {(verifyId || resetId) ? (
            <h2 className="text-center font-semibold text-3xl text-white">
                Recover password.
            </h2>

          )
        : 
            <h2 className="text-center font-semibold text-3xl text-white">
                Reset password.
            </h2>
        }
          <div className="mt-12">
            
            <div class="flex content-center items-center justify-center h-full mt-4">
              <div class="w-full lg:w-6/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-glass border-0"
                >
                  <div class="flex-auto px-4 lg:px-10 py-10">
                    {!verifyId ? (
                    
                          <form onSubmit={handleRequest}>
                                                  {loading && <div className="text-center">
                        <span className="fas fa-spinner animate-spin text-4xl block"></span>
                      </div>}
                        {msg.msg &&
                        <small className={`text-${msg.msgType}-500 text-center block mb-8 text-sm font-semibold`}> {msg.msg}</small>
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

                      <div class="text-center mt-6">
                        <button
                              class={`btn text-whie text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${loading && "opacity-50"}`}
                          type="submit"
                        >
                          Recover password
                        </button>
                      </div>
                    </form>

                    ): (

                        <form onSubmit={handleReset}>
                          {loading && <div className="text-center">
                        <span className="fas fa-spinner animate-spin text-4xl block"></span>
                      </div>}
                          {msg.msg && 
                            <small className={`text-${msg.msgType}-500 block mb-8 text-sm font-semibold capitalize`}> {msg.msg}</small>
                          }
                      

                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-white text-xs font-bold mb-2"
                        >
                              Password
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
                              class={`btn text-whie text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${ loading && "opacity-50"}`}
                              type="submit"
                        >
                          Update password
                        </button>
                      </div>
                    </form>

                    )}
                  </div>
                </div>
              </div>
            </div>
            

          </div>
          </div>
        </div>

    </Layout>
  )
}
