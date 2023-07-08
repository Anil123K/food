import React,{useState,useRef,useEffect} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

const Card = (props) => {

  let options=props.options;
  let priceOptions=Object.keys(options)
  let dispatch = useDispatchCart();
  let data=useCart()
  const priceRef = useRef();
  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("")

  const handleAddToCart=async ()=>{

    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
          return
        }
       return
      }
  
     await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
    //  console.log(data)
    }
    useEffect(() => {
        setSize(priceRef.current.value)
      }, [])
    let finalPrice = qty * parseInt(options[size]); 
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "16rem","maxHeight":"360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
           
            <div className="container w-100">
            <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6),(e,i)=>{
                    return(
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )
                })}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                })}
            </select>
            <div className="d-inline fs-5"> Rs{finalPrice}/-</div>
            </div>
          </div>
          <hr/>
          <button className={`btn btn-success justify-center ms-1 `} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card