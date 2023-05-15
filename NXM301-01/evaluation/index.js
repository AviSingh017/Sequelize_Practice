const express = require("express");

const db = require("./models/index");
const { products, brands } = require("./models/index");
const app = express();
app.use(express.json());


//brand read
app.get("/api/brands", async (req, res) => {
  try {
    
    const data = await brands.findAll();
    res.status(200).json({
      isError: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      error,
    });
  }
});


//brand  create
app.post("/api/brands/create", async (req, res) => {
    const { name, logo } = req.body;
    try {
      const data = await brands.create({
        name,
        logo,
      });
  
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (error) {
      res.status(400).json({
        isError: true,
        error,
      });
    }
  });


// brand update
app.put("/api/brands/update/:id", async (req, res) => {
  try {
    const { name, logo } = req.body;
    const data = await brands.upsert({
      id: req.params.id,
      name,
      logo,
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      error,
    });
  }
});

// btand delete
app.delete("/api/brands/delete/:id", async (req, res) => {
  try {
    //
    const data = await brands.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      error,
    });
  }
});









//product read
app.get("/api/products", async (re,res) => {
    try {
        brands.hasMany(products, {foreignKey :"brandID"});
        products.belongsTo(brands, {
            foreignKey: "brandID",
        })
        const data = await products.findAll({
            include : [brands],
        });
        res.status(200).json({
            isError: false,
            data,
        })
    } catch (error) {
        res.status(400).json({
            isError: true,
            error,
        })
    }
})


//product create

app.post("/api/products/create" ,async (req,res) => {

    const {name,image,price,brandID } = req.body
    try {
        const data = await products.create({
         name,
         image,
         price,
         brandID,
        });

        res.status(200).json({
            isError: false,
            data,
        })
    } catch (error) {
        res.status(400).json({
            isError: true,
            error,
        })
    }
})

// product update

app.put("/api/products/update/:id", async (req,res) => {
    try {
     const {name,image,price} = req.body;
     const data = await products.upsert({
        id:req.params.id,
        name,
        image,
        price,
     });
     res.status(200).json({
        isError: false,
        data,
    })

    } catch (error) {
        res.status(400).json({
            isError: true,
            error,
        })
    }
})

// product delete

app.delete("/api/products/delete/:id", async (req,res) => {
    try {

        const data = await products.destroy({
            where : {
               id: req.params.id,
            }
        });
        res.status(200).json({
           isError: false,
           data,
       })

       } catch (error) {
           res.status(400).json({
               isError: true,
               error,
           })
       }
})

db.sequelize.sync().then(() => {
  app.listen(4500, () => {
    console.log("server is running at port 4500");
  });
});


