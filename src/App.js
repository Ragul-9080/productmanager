import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const[prodcucts, setProdcucts] = useState([]);
  const [form, setForm] = useState({name: '', price: '', description: ''});
  const[isedit, setIsedit] = useState(false);
  const[editIndex, setEditIndex] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isedit) {
      const updated = [...prodcucts];
      updated[editIndex] = form;
      setProdcucts(updated);
      setIsedit(false);
      setEditIndex(null);
      alert("Product updated successfully!");
      return;
 
    }
    else{
        setProdcucts([...prodcucts, form]);
    }
  
    setForm({name: "", price: "", description: ""});
  }
  const handlechange = (event) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }
  const handledelete = (index) => {
   const willdelete = window.confirm("Are you sure you want to delete this product?")
   if (!willdelete) return;
    const updated= [...prodcucts];
    updated.splice(index, 1);
    setProdcucts(updated);
  }
  const hanndledit = (index) => {
    setForm(prodcucts[index]);
    setIsedit(true);
    setEditIndex(index);
  }

  return (
    <div className="container">
      <h2>product manage</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" 
        placeholder="prodcuct name"
        value={form.name}
        onChange={handlechange}
        required
        />
        <input name="price" 
        placeholder="prodcuct price"
        value={form.price}
        onChange={handlechange}
        type='number'
        required
        />
        <input name="description" 
        placeholder="description"
        value={form.description}
        onChange={handlechange}
        required
        />
        <button type="submit">Add Product</button>
      </form>
     <hr />
      <h3>Products List</h3>
      <ul>
        {prodcucts.map((product, index) => (
          <li key={index} className='product-item'>
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.description}</p>
            <br />
            <button onClick={() => {handledelete(index)}}>Delete</button>
            <button onClick={() => {hanndledit(index)}}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
