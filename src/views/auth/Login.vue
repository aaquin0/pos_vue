<template>
    <div>
        <div class="header-login">
            <div class="header-username" v-if="form.isLoggedIn">
                <div class="usericon mr-1">
                    <fa icon="store" />
                </div>
                <div class="usernameloc">
                    <h5 id="user-info-field">Account / Location</h5>
                </div>
            </div>
            <img src="@/assets/images/mosaic-logo.png" />
            <div class="signout-header" v-if="form.isLoggedIn">
                <a class="mt-3" href="javascript:" @click="handleLogout">
                    <fa icon="sign-out-alt" /> Log out
                </a>
            </div>
        </div>
        <div class="container h-100 mt-5 pt-3">
            <div class="row">
                <div class="col-lg-6 position-relative">
                    <div class="pt-lg-5 pr-lg-4 pl-lg-4 mx-5 left-mainlog">
                        <div class="logintime-section">
                            <h3>
                                <span>{{ form.time }}</span>
                            </h3>
                            <h4>{{ form.day }}</h4>
                        </div>

                        <div class="welcome-section">
                            <template v-if="!form.isLoggedIn">
                                <h1>Mosaic POS</h1>
                                <p>Please enter your credentials to login.</p>
                            </template>
                            <template v-if="form.isLoggedIn">
                                <h1>Welcome to <br>Account, Location</h1>
                                <p>Please enter your pin to login.</p>
                            </template>
                            <p class="trouble-p">
                                <b>Having trouble logging in?</b> <br>
                                Please contact your administrator.
                            </p>
                        </div>
                        <div class="footercontent-left">
                            <span>
                                <b>Mosaic POS Ver. {{ settings.version }}</b>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div id="main-login-form" v-if="!form.isLoggedIn">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div class="mainlogbox">
                                    <!-- Name -->
                                    <div class="form-group">
                                        <fa icon="user-alt" />
                                        <input
                                            type="text"
                                            name="username"
                                            class="form-control"
                                            placeholder="Username"
                                            v-model="form.values.username"
                                        />
                                    </div>

                                    <!-- Password -->
                                    <div class="form-group">
                                        <fa icon="lock" />
                                        <input
                                            type="password"
                                            name="password"
                                            class="form-control"
                                            placeholder="Password"
                                            v-model="form.values.password"
                                        />
                                    </div>
                                    <div class="mb-0">
                                        <div class="d-flex justify-content-end align-items-baseline">
                                            <button class="btn btn-prim btn-block" @click="handleLogin">Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Cashier Login-->
                    <div class="pt-2 pinlogin-wrapper" v-else>
                        <!-- Users -->
                        <div class="form-group userdrop">
                            <select class="form-control minimal" id="username" name="username" required>
                                <option value="">Select a user</option>
                                <option value=""></option>
                            </select>
                        </div>

                        <!-- PIN -->
                        <div class="">
                            <input
                                type="password"
                                name="password"
                                class="form-control pinput"
                                placeholder="Input your PIN"
                                autocomplete="current-password"
                                readonly="readonly"
                                required
                            />
                        </div>

                        <table class="pinbuttons-tbl">
                            <tr>
                                <td><div class="pinbutton">1</div></td>
                                <td><div class="pinbutton">2</div></td>
                                <td><div class="pinbutton">3</div></td>
                            </tr>
                            <tr>
                                <td><div class="pinbutton">4</div></td>
                                <td><div class="pinbutton">5</div></td>
                                <td><div class="pinbutton">6</div></td>
                            </tr>
                            <tr>
                                <td><div class="pinbutton">7</div></td>
                                <td><div class="pinbutton">8</div></td>
                                <td><div class="pinbutton">9</div></td>
                            </tr>
                            <tr>
                                <td><div class="pinbutton pinsquare">clear</div></td>
                                <td><div class="pinbutton">0</div></td>
                                <td>
                                    <div class="pinbutton pinsquare icon">
                                        <fa icon="backspace" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div class="loginbtn">
                            <button class="btn btn-primary" @click="handleLoginCashier">
                                <i class="fas fa-spinner fa-spin" v-if="form.loading"></i> Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import settings from "@/settings";
import {setToken, setIsLoggedIn, getIsLoggedIn, removeIsLoggedIn} from "@/utils/auth";

const form = reactive({
    day: '',
    time: '00:00 AM',
    error: {
        username: "",
        password: ""
    },
    values: {
        username: "",
        password: ""
    },
    validationMessages: {},
    loading: false,
    message: "",

    isLoggedIn: getIsLoggedIn() || false
})

let state = reactive({
    otherQuery: {},
    redirect: undefined
})

let now = ref(new Date());
const updateCurrentTime = () => {
    now = new Date();
    form.time = now.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
    })
    const month = now.toLocaleString('default', { month: 'long' });
    const day = now.toLocaleString('default', { day: 'numeric' });
    const weekday = now.toLocaleString('default', { weekday: 'long' });
    const year = now.toLocaleString('default', { year: 'numeric' });
    form.day = `${weekday}, ${month} ${day} ${year}`;
};
const updateTimeInterval = setInterval(updateCurrentTime, 1000);
onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
});

/* listen router change  */
const route = useRoute()
let getOtherQuery = (query) => {
    return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
            acc[cur] = query[cur]
        }
        return acc
    }, {})
}

watch(
    () => route.query,
    (query) => {
        if (query) {
            state.redirect = query.redirect
            state.otherQuery = getOtherQuery(query)
        }
    },
    { immediate: true }
)

const router = useRouter()
const handleLogin = () => {
    // for testing only
    setIsLoggedIn(true)
    form.isLoggedIn = getIsLoggedIn()
    return
    // ---
    const userStore = useUserStore();
    form.loading = true
    userStore
        .login(form.values)
        .then(() => {
            router.push({ path: state.redirect || '/', query: state.otherQuery })
            form.loading = false
        })
        .catch(error => {
            console.log('error', error)
        })
}

const handleLoginCashier = () => {
    // for testing only
    setToken('1234')
    router.push({ path: state.redirect || '/', query: state.otherQuery })
    // ---
}

const handleLogout = () => {
    // for testing only
    removeIsLoggedIn()
    form.isLoggedIn = false
}

const validate = () => {}
</script>
