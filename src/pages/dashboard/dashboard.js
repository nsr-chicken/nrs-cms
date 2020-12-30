import React from "react";
import './banner.scss'
import { storage, db } from "firebaseConfig"
export class Dashboard extends React.Component {

  state = {
    bannerImg: '',
    bannerFile: '',
    isUpdateLoder:false,

  }



  componentDidMount() {
    // const bannerDb = db.collection('banner').doc("001");

    // const doc =  bannerDb.get();
    // console.log(doc)
    db.collection("banner").doc("001").get().then((docRef) => {
      let {b_img}=docRef.data();
      this.setState({bannerImg:b_img})
      // console.log(docRef.data())
    }).catch((error) => { })
  }


  handleBanerImg = (fileInput) => {
    let { target } = fileInput;
    var reader = new FileReader();
    reader.readAsDataURL(target.files[0])
    reader.onload = (e) => {
      this.setState({ bannerImg: e.target.result, bannerFile: target.files[0] })
    }
    fileInput = ''
  }


  fileUploadBaner = () => {
    let { bannerFile } = this.state;
    this.setState({isUpdateLoder:true})
    const file = bannerFile;
    const name = 'img';
    const metadata = {
      contentType: file.type
    };
    const task = storage.child('banner/' + name).put(file, metadata)

    task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
    
      console.log(url);
     
      db.collection("banner").doc("001").set( { b_img: url}).then((docRef) => {
        this.setState({isUpdateLoder:false})
        this.setState({ bannerImg: url,bannerFile:'' })
      }).catch((error) => {  this.setState({isUpdateLoder:false}) })
   
    })
    .catch((error) => {  this.setState({isUpdateLoder:false}) })
  }



  render() {
    let { bannerImg,isUpdateLoder,bannerFile } = this.state;
    return (
      <div className="banner-page">
        <h4 className="page-titel mb-4">
          Banner 
        </h4>



        <div className="row justify-content-md-center mb-5">
          <div className="col-md-7 text-center">
            <div class="input-group mb-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" onChange={this.handleBanerImg} />
                <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary"  disabled={!bannerFile} type="button" onClick={this.fileUploadBaner}>{isUpdateLoder? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''} Update</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center mb-5">
          <div className="col-md-7 text-center">
           {bannerImg? <img src={bannerImg} />:
            <div className="align-items-center h-100 d-flex justify-content-center">
                                        <div class="lds-ripple"><div></div><div></div></div>
                                    </div>}
          </div>
        </div>
      </div>
    );
  }
}
