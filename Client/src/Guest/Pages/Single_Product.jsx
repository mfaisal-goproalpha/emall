import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { routePath } from '../../App';
import { CartGlobalContext } from "../Context/Context"
import Swal from 'sweetalert2';
import '../custom.css' 
function Single_Product() {

  const { _id } = useParams()
  const { stateCart, dispatchCart } = useContext(CartGlobalContext)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState([0])

  useEffect(() => {
    try {
      axios.get(`${routePath}api/getproductbyid/${_id}`)
        .then((json) => {
          setSelectedProduct(json.data.products)
        })
        .catch((error) => { console.log(error.message) })
    }
    catch (error) {
      console.log(error)
    }
  }, [_id])


// ADD TO CART
const addToCart = () => {
  try {
      const shopid = selectedProduct.shop_id;
      const item = { ...selectedProduct, count, shopid };
      dispatchCart({
        type: "ADD_TO_CART",
        payload: item,
      });
      localStorage.setItem("cart", JSON.stringify([...stateCart.cart, item]));
      Swal.fire({
        title: "Success!",
        text: "Added to Cart Successfully",
        icon: "success",
      });

  } catch (error) {
    console.log(error);
  }
};
 //console.log('localstorage cart => ', localStorage.getItem("cart"));
 const cart = JSON.parse( localStorage.getItem("cart") )
//console.log('cart details => ', cart)
var addproduct_status=false;
if(cart){
    cart.map((v, k) => {
      console.log('value of cart', v.shop_id)
      console.log('selectedProduct=> ',  selectedProduct.shop_id)
      if(v.shop_id == selectedProduct.shop_id){
        addproduct_status=false;
        return addproduct_status;
      }
    })
}else{
  addproduct_status=true;
}
console.log('addproduct_status => ', addproduct_status)

  return (
    <>
      <div className="card">
      <div className="single-product row auto my-5 mx-5">
        <div className="col-md-4 col-sm-12 d-flex px-sm-auto">
          <div className="row">
            <div className="col-lg-4 col-sm-12 d-flex flex-wrap">
              {selectedProduct.images?.map((val) => (
                  <img
                    src={val}
                    style={{ width: "120px", height: "120px" }}
                    alt=""
                    onClick={() => {
                      setMainImage(val);
                    }}
                  />
              ))}
            </div>
            <div className="main-image col-lg-8 col-sm-12 shadow p-2 ">
              <img
                src={mainImage == 0 ? selectedProduct.thumbnail : mainImage}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>

        </div>

        <div className="col-lg-6 col-sm-12 d-flex">
            <div className="card">
            <div className="row w-100">
              <div className="col-lg-9">
              <div className="card-body">
              <h5 className="card-title">{selectedProduct.title}</h5>
              <p className="card-text text-secondary">{selectedProduct.description}</p>

              <p className="card-text"><strong>Product Category:
              </strong>  <span className='mx-3'>{selectedProduct.category}</span></p>
              <p className="card-text"><strong>Shop ID:
              </strong>  <span className='mx-3'>{selectedProduct.shop_id}</span></p>

              <p className="card-text "><strong>Price :
              </strong><span className='mx-3'>Rs. {selectedProduct.price}</span></p>

            </div>
              </div>
              <div className="col-lg-3 justify-content-center d-flex flex-column">
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary m-2" onClick={() => (setCount(count - 1))} disabled={count > 1 ? false : true}>-</button>
                <p className='text-center m-3'>{count}</p>
                <button className="btn btn-primary m-2" onClick={() => (setCount(count + 1))}>+</button>
              </div>
              <div className="d-flex justify-content-center">
                
                
                
                {
                  addproduct_status ? (
                  <Link to={"/cart"} className='text-decoration-none'>
                    <button className="btn mx-2 mt-3 add-to-cart btn-outline-dark" onClick={addToCart}>
                      Add to Cart
                    </button>
                  </Link>
                  ) : (
                    <p>Only same shop products are allowed.</p>
                  )
                }
              </div>
              </div>
            </div>
            </div>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-12 shadow p-3">
          <p className="mx-auto fw-semibold">This product is available in following place(s):</p>
          <div>
            <p className='my-2 fw-semibold'>Country: <span className='fw-normal'> Pakistan</span></p>
            <p className='my-2 fw-semibold'>City: <span className='fw-normal'> Karachi</span></p>
          </div>
        </div>
      </div>
      </div>
    </>
  )

}

export default Single_Product





