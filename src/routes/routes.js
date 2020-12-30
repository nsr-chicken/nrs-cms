
const routers = [
  {
    path: '/',
    auth: false,
    exact: true,
    redirect: '/auth/login',
  },
  {
    component: 'AuthLayout',
    path: '/auth',
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Login",
        path: "/login/",
        auth: false,
        exact: true,
      },
      {
        component: "SignUp",
        path: "/signUp/",
        auth: false,
        exact: true,
      },
      {
        component: "Forgot",
        path: "/forgot/",
        auth: false,
        exact: true,
      },
      {
        component: "Reset",
        path: "/reset/:token",
        auth: false,
        exact: true,
      }
    ]
  },
{
    component: "MainLayout",
    path: "/dashboard",
    redirect: "/dashboard/",
    auth: false,
    exact: true,
    childrens: [
      {
        component: "Dashboard",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: "MainLayout",
    path: "/product",
    redirect: "/product/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Product",
        path: "/",
        auth: false,
        exact: true
      },
      
    ]
  },

  {
    component: "MainLayout",
    path: "/about",
    redirect: "",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "About",
        path: "/",
        auth: false,
        exact: true
      },
     
    ]
  },
  
  

  {
    component: "MainLayout",
    path: "/settings",
    redirect: "/settings/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Settings",
        path: "/",
        auth: false,
        exact: true
      }
      
    ]
  },

  {
    component: "MainLayout",
    path: "/payments",
    redirect: "/payments/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Payments",
        path: "/",
        auth: false,
        exact: true
      }
      
    ]
  },
  
  //dev layout

  {
    component: "MainLayout",
    path: "/devLayout",
    redirect: "/devLayout/components/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Components",
        path: "/components",
        auth: false,
        exact: true
      }
    ]
  }
  


];
export default routers;

