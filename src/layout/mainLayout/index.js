import React from "react";
import { Header, Sidebar } from "../../component/common";
import { EXIST_LOCAL_STORAGE } from "../../service/constants";
import { history } from "../../helpers";
export class MainLayout extends React.Component {


  componentWillMount() {
    // let authToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
    let userId = localStorage.getItem(EXIST_LOCAL_STORAGE.USER_ID);
    console.log(userId)

    if (!userId) {
      console.log('no token')
      history.push("/auth/login")

    } else {
      console.log('no token')
     

    }

  }




  render() {
    return (
      <>
        <Header />
        <div className="d-flex" id="wrapper">

          <Sidebar />
          <div id="page-content-wrapper">

            <section>{this.props.children}</section>
          </div>
        </div>
        {/* <Footer /> */}

      </>
    );
  }
}
