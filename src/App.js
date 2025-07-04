import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data || []);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
     
      const { data, error } = await supabase
        .from('products')
        .update({ name: form.name, price: form.price, description: form.description })
        .eq('id', editId);
      if (error) {
        alert('Error updating product: ' + error.message);
        return;
      }
      alert('Product updated successfully!');
      
      const { data: newData } = await supabase.from('products').select('*');
      setProducts(newData || []);
      setIsEdit(false);
      setEditId(null);
    } else {
     
      const { data, error } = await supabase
        .from('products')
        .insert([{ name: form.name, price: form.price, description: form.description }]);
      if (error) {
        alert('Error adding product: ' + error.message);
        return;
      }
      alert('Product added!');
    
      const { data: newData } = await supabase.from('products').select('*');
      setProducts(newData || []);
    }
    setForm({ name: '', price: '', description: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleDelete = async (id) => {
    const willDelete = window.confirm('Are you sure you want to delete this product?');
    if (!willDelete) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Error deleting product: ' + error.message);
      return;
    }
   
    const { data: newData } = await supabase.from('products').select('*');
    setProducts(newData || []);
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, description: product.description });
    setIsEdit(true);
    setEditId(product.id);
  };

  return (
    <div className="container">
      <h2>Product Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Product price"
          value={form.price}
          onChange={handleChange}
          type="number"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEdit ? 'Update Product' : 'Add Product'}</button>
      </form>
      <hr />
      <h3>Products List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.description}</p>
            <br />
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
