import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import api from './services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

function Table1List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/table1');
      setItems(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Table 1 List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.column1} - {item.column2}</li>
        ))}
      </ul>
    </div>
  );
}

function Table1Create() {
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/table1', { column1, column2 });
      setColumn1('');
      setColumn2('');
    } catch (error) {
      console.error('Create failed', error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Table 1 Item</h2>
      <input type="text" value={column1} onChange={e => setColumn1(e.target.value)} placeholder="Column 1" />
      <input type="text" value={column2} onChange={e => setColumn2(e.target.value)} placeholder="Column 2" />
      <button type="submit">Create</button>
    </form>
  );
}

function Table1Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/table1/${id}`);
      setColumn1(response.data.column1);
      setColumn2(response.data.column2);
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/table1/${id}`, { column1, column2 });
      navigate('/table1');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Table 1 Item</h2>
      <input type="text" value={column1} onChange={e => setColumn1(e.target.value)} placeholder="Column 1" />
      <input type="text" value={column2} onChange={e => setColumn2(e.target.value)} placeholder="Column 2" />
      <button type="submit">Update</button>
    </form>
  );
}

function Table2List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/table2');
      setItems(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Table 2 List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.column1} - {item.column2}</li>
        ))}
      </ul>
    </div>
  );
}

function Table2Create() {
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/table2', { column1, column2 });
      setColumn1('');
      setColumn2('');
    } catch (error) {
      console.error('Create failed', error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Table 2 Item</h2>
      <input type="text" value={column1} onChange={e => setColumn1(e.target.value)} placeholder="Column 1" />
      <input type="text" value={column2} onChange={e => setColumn2(e.target.value)} placeholder="Column 2" />
      <button type="submit">Create</button>
    </form>
  );
}

function Table2Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/table2/${id}`);
      setColumn1(response.data.column1);
      setColumn2(response.data.column2);
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/table2/${id}`, { column1, column2 });
      navigate('/table2');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Table 2 Item</h2>
      <input type="text" value={column1} onChange={e => setColumn1(e.target.value)} placeholder="Column 1" />
      <input type="text" value={column2} onChange={e => setColumn2(e.target.value)} placeholder="Column 2" />
      <button type="submit">Update</button>
    </form>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table1" element={<Table1List />} />
        <Route path="/table1/create" element={<Table1Create />} />
        <Route path="/table1/edit/:id" element={<Table1Edit />} />
        <Route path="/table2" element={<Table2List />} />
        <Route path="/table2/create" element={<Table2Create />} />
        <Route path="/table2/edit/:id" element={<Table2Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
