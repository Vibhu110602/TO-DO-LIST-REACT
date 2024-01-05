const express=require('express')
const PORT=process.env.PORT ?? 8000
const app=express()
const cors=require('cors')
const {v4:uuidv4}= require('uuid');
const pool=require('./db');
const bcrypt=require('bcrypt');
app.use(cors());
app.use(express.json());
const jwt=require('jsonwebtoken');

app.get('/todos/:mail', async (req,res)=>{
  pool.connect();
  try{
    const {mail}=req.params
    const todos=await pool.query('SELECT * FROM todos where user_email=$1',[mail]);
    res.json(todos.rows)
  } catch(err) {
    console.log(err);
  }
});

app.post('/todos', async(req,res)=> {
  const {user_email,title,progress,date} =req.body;
  const id=uuidv4();
  console.log(id,user_email,title,progress,date);
  try {
    const newToDO=await pool.query(`INSERT INTO todos(id,user_email,title,progress,date) VALUES ($1 ,$2 ,$3 ,$4, $5)`,[id,user_email,title,progress,date]);
    res.json(newToDO);
  }catch(err) {
    console.log(err);
  }
})

app.put('/todos/:id',async (req,res) => {
  const {id}=req.params;
  const {user_email,title,progress,date } = req.body;
  try {
    const edited=await pool.query('UPDATE todos SET user_email=$1 ,title=$2  ,progress=$3 , date=$4 where id=$5;',[user_email,title,progress,date,id]);
    res.json(edited);
  }catch(err) {
    console.log(err);
  }
});

app.delete('/todos/:id', async(req,res) => {
  const {id} = req.params;
  try {
    const deleted = await pool.query('DELETE FROM todos WHERE id=$1;',[id]);
    res.json(deleted);
  }catch(err) {
    console.log('ERROR IN DELETING');
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hpass = bcrypt.hashSync(password, salt);
  try {
    const signup = await pool.query(`INSERT INTO Person values ($1, $2);`, [email, hpass]);
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

app.post('/login',async(req,res) => {
  const {email,password}=req.body;
  try {
    const user=await pool.query('SELECT * from Person where email=$1',[email]);
    if(!user.rows.length)return res.json({detail:'User does not exist!'});
    const suc=await bcrypt.compare(password,user.rows[0].hash_pass);
    if(suc) {
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
      res.json({'email':user.rows[0].email,token})
    }else {
      return res.json({detail:'Login Failed!'});
    }
  }catch (err) {
    console.error(err);
  }
});



app.listen(PORT ,()=>
  console.log(`Server Running on Port ${PORT}`)
);