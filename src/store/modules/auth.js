let timer

export default {
  namespace: true,
  state() {
    return {
      userId: null,
      token: null,
      didLogout: false,
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
    },
    didLogout(state) {
      state.didLogout = true
    },
  },
  getters: {
    userId(state) {
      return state.userId
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    },
    autoLogout(state) {
      return state.didLogout
    },
  },
  actions: {
    async login(context, payload) {
      context.dispatch("auth", { ...payload, mode: "login" })
    },
    async signup(context, payload) {
      context.dispatch("auth", { ...payload, mode: "signup" })
    },
    logout(context) {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("tokenExpiration")
      clearTimeout(timer)
      context.commit("setUser", { token: null, userId: null })
    },

    async auth(context, payload) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-SnR6jwCYW33MUGjHUFyHqUSCKORBzLY"

      if (payload.mode === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-SnR6jwCYW33MUGjHUFyHqUSCKORBzLY"
      }
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      })

      let respData = await resp.json()
      if (!resp.ok) {
        throw new Error(respData.message || "Wrong data")
      }

      const user = {
        name: payload.name,
        email: payload.email,
      }

      if (payload.mode === "signup") {
        let urlDB = context.rootGetters.dbUrl
        const res = await fetch(`${urlDB}/users/${respData.localId}.json`, {
          method: "PUT",
          body: JSON.stringify(user),
        })
        let respD = await res.json()
        if (!resp.ok) {
          throw new Error(respD.message || "Some Error")
        }
      }

      const expirationDate =
        new Date().getTime() + Number(respData.expiresIn) * 100000

      console.log(respData)

      localStorage.setItem("token", respData.idToken)
      localStorage.setItem("userId", respData.localId)
      localStorage.setItem("tokenExpiration", expirationDate)

      // timer = setTimeout(() => {
      //   console.log("end")
      //   context.dispatch("autoLogout")
      // }, Number(expirationDate))

      context.commit("setUser", {
        token: respData.idToken,
        userId: respData.localId,
      })
    },

    autoLogin(context) {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const tokenExpiration = localStorage.getItem("tokenExpiration")

      const timeLeft = new Date().getTime() - Number(tokenExpiration)

      console.log(timeLeft)
      if (timeLeft < 0) {
        return
      }
      timer = setTimeout(() => {
        context.dispatch("autoLogout")
      }, timeLeft)

      if (token && userId) {
        context.commit("setUser", { token, userId })
      }
    },
    autoLogout(context) {
      context.dispatch("logout")
      context.commit("didLogout")
    },
  },
}
