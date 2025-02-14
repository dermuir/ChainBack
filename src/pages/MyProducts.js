import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faGroup from '@fortawesome/fontawesome-free-solid/faObjectGroup'

import AnnotatedSection from '../components/AnnotatedSection'
import Search from '../components/Search';

class MyProducts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.props.passageInstance.getOwnerProducts({ from: this.props.web3Accounts[0] })
      .then((result) => {
        result.map((productId) => {
          this.props.passageInstance.getProductById(String(productId).valueOf(), "latest")
            .then((result) => {
              const product = {
                name: result[0],
                description: result[1],
                latitude: parseFloat(result[2]),
                longitude: parseFloat(result[3]),
                versionCreationDate: Date(result[4]),
                versions: result[5],
                id: productId,
              }
              this.setState({products: [...this.state.products, product]})
            })
            .catch((error) => {
              console.log(error);
            })
          return false;
        })
      });
  }

  render() {
    const products = this.state.products.map((product, index) => {
      return (
        <Link key={index} to={`/products/${product.id}`}>
          <div key={index}>
            <b>{product.name || "Producto sin titulo"}</b> &mdash; {product.description || "No descripcion"}
            <hr/>
          </div>
        </Link>
      )
    })

    return (
      <div>
        <AnnotatedSection
          annotationContent={
            <div>
              <FontAwesomeIcon fixedWidth style={{paddingTop:"3px", marginRight:"6px"}} icon={faSearch}/>
              Buscar producto
            </div>
          }
          panelContent={
            <div>
              <Search/>
            </div>
          }
        />
        <AnnotatedSection
          annotationContent={
            <div>
              <FontAwesomeIcon fixedWidth style={{paddingTop:"3px", marginRight:"6px"}} icon={faList}/>
              Productos
              <Link style={{marginLeft: "10px"}} to="/create">+</Link>
            </div>
          }
          panelContent={
            <div>
              {products && products.length > 0 ? products : 
              <div>
                Aun no has creado un producto.
                <Link style={{marginLeft: "10px"}} to="/create">Añadir un producto</Link>
              </div>}
            </div>
          }
        />
        <AnnotatedSection
          annotationContent={
            <div>
              <FontAwesomeIcon fixedWidth style={{paddingTop:"3px", marginRight:"6px"}} icon={faGroup}/>
              Funciones
            </div>
          }
          panelContent={
            <div>
              <div>
                <Link style={{marginLeft: "10px"}} to="/combineList">Modo lista</Link>
              </div>
              <div>
                <Link style={{marginLeft: "10px"}} to="/combineScan">Escaneo de QR</Link>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    passageInstance: state.reducer.passageInstance,
    productIdToView: state.reducer.productIdToView,
    web3Accounts: state.reducer.web3Accounts
  };
}

export default connect(mapStateToProps)(MyProducts);
