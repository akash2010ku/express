const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://akash2010ku:FljbGsdwBeVtXdVK@cluster0.dbg7a4t.mongodb.net/", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String, // Corrected spelling from 'discription' to 'description'
});

const Todo = mongoose.model("Todo", todoSchema);
app.use(express.json());

app.post("/addTodo", (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description // Corrected spelling from 'discription' to 'description'
    });

    todo.save((err, savedTodo) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error saving todo");
        } else {
            res.send(savedTodo);
        }
    });
});

app.get("/getTodo", async(req, res) => {
//     let collection =  db.collection("todos");
//   let results =  collection.find({})
    
//     .toArray();
//   res.send(results).status(200);
const data= await Todo.find({});
res.send(data)
});


app.delete("/deleteTodo",async(req,res)=>{
    const id=req.params.id;
  const data= await Todo.deleteOne({_id:id})
   res.send(data)

})



app.listen(3001, () => {
    console.log("listening on port 3001");
});
