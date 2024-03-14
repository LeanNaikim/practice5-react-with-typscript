import {useEffect , useState } from 'react'
import './App.css'
import { Button, Modal } from 'flowbite-react';
import CardComponent from './conponents/CardConponent'
import FormCreateProductConponent from './conponents/FormCreateProductComponent';

type Status = 'idle' | 'loading' | 'success' | 'error'
type products = {
  readonly id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  image: string
}

function App() {
  // const [count, setCount] = useState(0)
  const [products , setProducts] = useState<products[]>([])
  const [status , setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading")
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
      setProducts(data)
      setStatus("success")
    }).catch(err => {
      setStatus("error")
    })
  },[])

  if(status === "loading") {
    return (
      <div className="h-screen grid place-content-center">
          <h1 className="text-6xl">Loading</h1>
      </div>
    )
  }

  function getDataForm( products:any){
      setDataForm(products);
  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products',{
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type" : "application/json;",
      },
    }).then((res) => 
      res.json()).then((data) => {
        console.log("Create Product Successfully")
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
      setOpenModal(false);
  }



  console.log(status)
  return (
    <>
      {/* <div>
        <h1>{count}</h1>
        <Button onClick={() => setCount(count +1)}>click me</Button>
        <CardComponent title="Hello my name is susu !!!" image="https://i.pinimg.com/474x/c2/d2/bf/c2d2bfbd3889e0d074a2a59f7b06dc76.jpg" price={2000}/>
      </div>
      <hr /> */}

      <div className="flex justify-center my-6">
        <Button onClick={() => setOpenModal(true)}>Create product</Button>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {products.map((products) => (
          <CardComponent 
              key={products.id}
              title={products.title}
              image={products.image}
              price={products.price}
          />
        ))}
      </div>

      {/* modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <FormCreateProductConponent getDataForm={getDataForm}/>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default App
