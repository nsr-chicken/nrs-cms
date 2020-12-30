import React from "react";
import './About.scss'
import { storage, db } from "firebaseConfig"
import SimpleReactValidator from 'simple-react-validator';
export class About extends React.Component {

    state = {
        about: {
            createDate: '',
            text: '',
            updatedDate: ''
        },
        isLoder:true
    }


    componentDidMount() {
        this.validator = new SimpleReactValidator({
            element: message => (
                <span className="error-message text-danger validNo fs14">{message}</span>
            ),
            autoForceUpdate: this,
        });
        this.setState({isLoder:true})
        db.collection("about").doc("001").get().then((docRef) => {

            this.setState({ about: docRef.data(),isLoder:false })
            // console.log(docRef.data())
        }).catch((error) => { this.setState({isLoder:false})})

    }




    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            about: {
                ...this.state.about,
                [name]: value
            }
        })
    }


    handleUpdateData = () => {
        let {about}=this.state;
        this.setState({isLoder:true})
        if (this.validator.allValid()) {
            this.validator.hideMessages();
            about.updatedDate=new Date();
            db.collection("about").doc('001').set(about).then((docRef) => {

                this.setState({isLoder:false})

            }).catch((error) => {this.setState({isLoder:false}) })
        } else {
            this.validator.showMessages();
        }

    }

    render() {
        let { about,isLoder } = this.state;
        return (
            <div className="banner-page">
                <h4 className="page-titel mb-4">
                    About
        </h4>



                <div className="row">
                    <div className="col-md-7 ">
                        <div className="form-group">
                            <label for="exampleInputEmail1">About Distribution</label>
                            <textarea type="email" value={about.text} disabled={isLoder} className="form-control" name="text" rows="3" placeholder="Enter" onChange={this.handleInputChange} />

                        </div>
                    </div>
                </div>
                <div className="row  mb-5">
                    <div className="col-md-7 text-right">
                        <button type="button" className="btn btn-outline-primary" onClick={this.handleUpdateData}>{isLoder? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''} Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
