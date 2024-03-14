import {useEffect , useState } from 'react'
import './App.css'
import { Button } from 'flowbite-react'
import CardComponent from './conponents/CardConponent'

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
  const [count, setCount] = useState(0)
  const [products , setProducts] = useState<products[]>([])
  const [status , setStatus] = useState<Status>('idle')

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

  console.log(status)
  return (
    <>
      {/* <div>
        <h1>{count}</h1>
        <Button onClick={() => setCount(count +1)}>click me</Button>
        <CardComponent title="Hello my name is susu !!!" image="https://i.pinimg.com/474x/c2/d2/bf/c2d2bfbd3889e0d074a2a59f7b06dc76.jpg" price={2000}/>
      </div>
      <hr /> */}
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
    </>
  )
}
export default App
