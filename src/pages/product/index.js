import React from "react";
import './product.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NormalToggleSwitch } from 'component/common'
import { storage, db } from "firebaseConfig"
import SimpleReactValidator from 'simple-react-validator';
export class Product extends React.Component {
    state = {
        isModalShow: false,
        productObj: {
            name: '',
            distribution: '',
            Price: '',
            saleType: 'KG',
            Image: '',
            active: true,
            createDate: '',
            updatedDate: ''
        },
        imgProd: '',
        isAddproduct: false,
        productList: [],
        productLoder: true,
    }



    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            productObj: {
                ...this.state.productObj,
                [name]: value
            }
        })
    }



    componentDidMount() {
        this.validator = new SimpleReactValidator({
            element: message => (
                <span className="error-message text-danger validNo fs14">{message}</span>
            ),
            autoForceUpdate: this,
        });


        this.getDataProd()
    }


    getDataProd = () => {
        this.setState({ productList: [], productLoder: true })
        db.collection('product').orderBy("name", "asc").get().then((querySnapshot) => {
            let data = querySnapshot.docs.map(doc => {
                console.log('LOG 1', doc.data());

                return { id: doc.id, ...doc.data() }
            });
            console.log('LOG 2', data);
            this.setState({ productList: data, productLoder: false })
        }).catch((error) => { this.setState({ productLoder: false }) })

    }



    handleProdImg = (fileInput) => {
        let { target } = fileInput;
        var reader = new FileReader();
        console.log('target.files[0]------>', target.files[0])
        reader.readAsDataURL(target.files[0])
        reader.onload = (e) => {
            this.setState({
                productObj: {
                    ...this.state.productObj,
                    ['Image']: e.target.result
                },
                imgProd: target.files[0]
            })
            // productObj.Image = e.target.result;
            // this.setState({ productObj, imgProd: target.files[0] })
        }
        fileInput = ''
    }




    handleAddProduct = () => {
        if (this.validator.allValid()) {
            this.setState({ isAddproduct: true })
            let { imgProd, productObj } = this.state;
            console.log('imgProd------>', imgProd)
            const file = imgProd;
            const name = 'img';
            const metadata = {
                contentType: file.type
            };
            if (productObj.hasOwnProperty("id")) {
                productObj.updatedDate = new Date()
            } else {
                productObj.createDate = new Date()
            }

            this.validator.hideMessages();
            const task = storage.child('product/' + name).put(file, metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {

                console.log(url);
                let apiCall = productObj.hasOwnProperty("id") ? db.collection("product").doc(productObj.id).set(productObj) : db.collection("product").add(productObj)

                apiCall.then((docRef) => {
                    productObj.Image = url;
                    this.setState({ productObj, bannerFile: '', isModalShow: false, isAddproduct: false })
                    this.getDataProd()
                }).catch((error) => { this.setState({ isAddproduct: false, isModalShow: false }) })

            })
                .catch((error) => { this.setState({ isAddproduct: false, isModalShow: false }) })
        } else {
            this.validator.showMessages();
        }

    }


    handleEditModal = (i) => {
        let { productList, productObj } = this.state;
        console.log(this.state.productList[i])
        this.setState({ isModalShow: true, productObj: productList[i] })
    }


    render() {
        let { isModalShow, productObj, isAddproduct, productList, productLoder } = this.state;
        return (
            <div className="product-page">
                <div className="row">
                    <div className="col-md-6 ">
                        <h4 className="page-titel mb-4"> Product</h4>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" className="btn btn-primary" onClick={() => this.setState({ isModalShow: true })}>Add New</button>
                    </div>
                </div>




                <div className="row mb-5">
                    {productLoder && [1, 2, 3, 4, 5, 6, 7, 8].map((data, i) =>

                        <div className="col-md-3 ">
                            <div className={`card mb-4 `} >
                                <div className="card-img-top" style={{ height: '250px' }}>
                                    <div className="align-items-center h-100 d-flex justify-content-center">
                                        <div class="lds-ripple"><div></div><div></div></div>
                                    </div>
                                </div>
                                <div className="card-body" style={{ height: '221px' }}>
                                    <div className="ph-loader ph-19h mb-3 w-50"></div>
                                    <div className="ph-loader ph-5h w-25"></div>
                                </div>
                            </div>
                        </div>)}

                    {!productLoder && productList.map(({ distribution, Image, Price, saleType, name, active }, i) =>
                        <div className="col-md-3 ">
                            <div className={`${!active ? "card-deActive" : ''} card mb-4`} >
                                <img className="card-img-top" src={Image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{name} <span class="material-icons text-success cursor-pointer" onClick={() => this.handleEditModal(i)}>create</span></h5>
                                    <p className="card-text ">{distribution}</p>

                                    <div className="row">
                                        <div className="col-md-6 col-xs-12">
                                            {active ? <span className="text-success">Active</span> :
                                                <span className="text-danger">De-active</span>}
                                        </div>
                                        <div className="col-md-6 col-xs-12">
                                            <h5 className="text-right">1{saleType} {Price}₹</h5>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {isModalShow ?
                    <Modal isOpen={isModalShow} toggle={() => this.setState({ isModalShow: false })} >
                        <ModalHeader toggle={() => this.setState({ isModalShow: false })}>Add Product</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Product Name</label>
                                        <input type="text" className="form-control" name='name' value={productObj.name} onChange={this.handleInputChange} placeholder="Enter" />
                                        {this.validator.message('Product Name', productObj.name, 'required|max:15')}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Distribution</label>
                                        <textarea className="form-control" name='distribution' value={productObj.distribution} onChange={this.handleInputChange} rows="3"></textarea>
                                        {this.validator.message('Distribution', productObj.distribution, 'required|max:300')}
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Price</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <select className="custom-select mb-3" name='saleType' value={productObj.saleType} onChange={this.handleInputChange}>
                                                    <option value="KG">KG</option>
                                                    <option value="Piece">Piece </option>
                                                </select>
                                            </div>
                                            <input type="text" className="form-control" name='Price' value={productObj.Price} onChange={this.handleInputChange} placeholder="Enter Price" />
                                        </div>
                                        {this.validator.message('Price', productObj.Price, 'required|')}
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Active / De-active</label><br />
                                        <NormalToggleSwitch checked={productObj.active} name="active" onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Image</label>
                                        <div class="input-group mb-3">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" name='Image' onChange={this.handleProdImg} />
                                                <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                        {this.validator.message('Image', productObj.Image, 'required|')}
                                    </div>
                                </div>

                                <div className="col-md-12">{productObj.Image ?
                                    <img className="img-thumbnail" width="200" height="200" src={productObj.Image} alt="Card image cap" /> : ''}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" disabled={isAddproduct} onClick={this.handleAddProduct} >{isAddproduct ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''} {productObj.hasOwnProperty("id") ? 'Update' : 'Save'}</Button>{' '}
                            <Button color="secondary" disabled={isAddproduct} onClick={() => this.setState({ isModalShow: false })}>Cancel</Button>
                        </ModalFooter>
                    </Modal> : ""}

            </div>
        );
    }
}
