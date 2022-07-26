import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

let router = new Router({
    mode: 'hash',
    //base: process.env.BASE_URL,
    routes: [
        {
			name: "HomePage",
			path: '/',
			redirect: 'login'
			// component: () => import('@/views/auth/Login'),
			// meta: { authorize: [] }
		},
		{
			name: "Login",
			path: '/login',
			component: () => import('@/views/auth/Login'),
			// meta: { authorize: [] }
		},

        {
            name: 'AdminRoutes',
            path: '/admin',
            redirect: '/',
            component: () => import('@/layouts/Layout'),
            children: [
                // Components
                
                {
                    name: 'Dashboard',
                    path: '/',
                    component: () => import('@/views/pages/Dashboard'),
                },

                
             

                {
                    name: 'Events',
                    path: '/events',
                    component: () => import('@/views/pages/Games'),
                },
                {
                    name: 'Merchant',
                    path: '/merchant',
                    component: () => import('@/views/pages/merchant'),
                },
                {
                    name: 'Registrations',
                    path: '/registration',
                    component: () => import('@/views/pages/registration'),
                },
                {
                    name: 'Winners',
                    path: '/winners',
                    component: () => import('@/views/pages/winners'),
                },
               
            ]
        },

    ],
});

router.beforeEach((to, from, next) => {

	const { authorize } = to.meta;
	const userRole = store.getters.userRole;
	const isLoggedIn = store.getters.isLoggedIn;

	if (authorize) {
		if (!isLoggedIn) {
			// not logged in so redirect to login page with the return url
			return next({ path: '/login', query: { returnUrl: to.path } });
		}
		// check if route is restricted by role
		if (authorize.length && !authorize.includes(userRole)) {
			// role not authorised so redirect to home page
			return next({ path: `/${userRole.toLowerCase()}` });
		}
	}
	next();
});

export default router