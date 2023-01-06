const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const session = require("express-session");
const parseurl = require("parseurl");
const multer = require('multer');



const pool = mysql.createPool({
    connectionLimit: 10000,
    hostname: "localhost",
    user: "root",
    password: "",
    database: "projet_3wa"
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "chien",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:3_600_000}
}));


// objet multer avec méthode diskStorage
const storage = multer.diskStorage({
    // où stocker les fichiers uploader (requête, fichier, callback)
    destination: (req, file, callback) => {
       // erreur à null 
      callback(null, "./public/images/")
    },
    // 2e propriété : nom du fichier 
    filename: (req, file, callback) => {
      callback(null, Date.now() + '.' + file.originalname)
  
    },
  })
  // middleware, méthode multer, paramètre de stockage définit au dessus
  const upload = multer({storage : storage
  });



app.use((req, res, next) => {
    let pathname = parseurl(req).pathname.split("/");
    let protectedPath = ["rent"];
    if (!req.session.isLogged && protectedPath.includes(pathname[1])) {
        res.locals.isLogged = false;
    } else {
        res.locals.isLogged = true;
    }
    next();
});


// (home)
app.get("/", (req, res) => {
    const getMotoSql = "SELECT * FROM motos"
    pool.query(getMotoSql, (err, result) => {
        res.send(result)
    });
});


// app.post("/rent/:id", (req, res) => {
    //     let id = req.params.id
    //     console.log(id)
    //     const brand = req.body.brand
    //     console.log(brand)
    //     const model = req.body.model
    //     const price = req.body.price
    //     const img = req.body.img
    
    //     const sqlInsertRent = "INSERT INTO motos (model, brand, price, img, user_id) VALUES (?,?,?,?,?)";
    //     pool.query(sqlInsertRent, [model, brand, price, img, id], (err, result) => {
        //     });
        // })
        
        
        // FORMULAIRE POUR LOUER SA MOTO (rent) ET INSERER UNE IMAGE
app.post("/rent/:id", upload.single("image"), (req, res) => {
    // console.log("hey");
    
    if (!req.file) {
      // console.log("No file upload");
      return res.send("Veuillez insérer une image")
      
    } else {
      // console.log(req.file.filename)
      let id = req.params.id
      let imgsrc= req.file.filename;
      console.log(imgsrc)
      console.log(id)
      const brand = req.body.brand
      console.log(brand)
      const model = req.body.model
      const price = req.body.price

      const sqlInsertRent = "INSERT INTO motos (model, brand, price, img, user_id) VALUES (?,?,?,?,?)";
        pool.query(sqlInsertRent, [model, brand, price, [imgsrc], id], (err, result) => {
            console.log(err);
            console.log(result);
            });
        }
});


// AFFICHER UNE MOTO (showmoto)
app.get("/moto/:id", (req, res) => {
	let id = req.params.id;
	pool.query(
		"SELECT model, brand, price, img FROM motos WHERE motos.id = ? ",
		[id],
		function (error, result, fields) {
			res.send(result);
		},
	);
});

// CREATION DU COMPTE USER (register)
app.post("/register", (req, res) => {
    const username = req.body.username
    const userLastName = req.body.userLastName
    const email = req.body.email
    const password = req.body.password

    const sqlInsertUser = "INSERT INTO users (user_name, user_lastname, email, user_password) VALUES (?,?,?,?)";
    pool.query(sqlInsertUser, [username, userLastName, email, password], (err, result) => {
    });
})


// USER CONNECTION (login)
app.post("/login", (req, res) => {
	//chercher les infos concernant cet email
    console.log(req.body)
    pool.query(
       "SELECT * FROM users WHERE email = ?",[req.body.email], (err, result) => {
        // console.log(result)
        if (result.length === 0) {
            res.json({
                response: false,
                message: "Cet email n'existe pas"
            })
        }
        else {
            if (result[0].user_password === req.body.password) {
                console.log(result)
                res.json({
                    response: true, 
                    message: "Vous êtes connecté",
                    userId: result[0].id
                })
            } else {
                res.json({
                    response: false,
                    message: "le mot de passe n'est pas correct"
                })
            }
        }
       }

    )
});


app.get("/reservations", (req, res) => {
    const getReservation = "SELECT * FROM commands"
    pool.query(getReservation, (err, result) => {
        res.send(result)
    });
});


app.post("/add/reservation", (req, res) => {
    const motoId = req.body.moto_id
    const userId = req.body.user_id
    const startDate = req.body.start_date
    const endDate = req.body.end_date
    const price = req.body.price

    const sqlCreateCommand = "INSERT INTO commands (start_date, end_date, price, user_id, moto_id) VALUES (?,?,?,?,?)";
    pool.query(sqlCreateCommand, [startDate, endDate, price, userId, motoId], (err, result) => {
    });
});


app.get("/reservation/:id", (req, res) => {
	let id = req.params.id;
	pool.query(
        "SELECT * FROM motos JOIN commands ON motos.id = commands.moto_id WHERE commands.id = ?",
		[id],
		function (error, result, fields) {
			res.send(result);
		},
	);
});

app.get("/account/:id", (req, res) => {
	let id = req.params.id;
	pool.query(
		"SELECT * FROM users WHERE users.id = ?",
		[id],
		function (error, result, fields) {
			res.send(result);
		},
	);
});

app.put("/update-account/:id", (req, res) => {
	let id = req.params.id;
    let lastname = req.body.lastname;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
	pool.query(
		"UPDATE users SET user_name = ?, user_lastname = ?, email = ?, user_password = ? WHERE users.id = ?",
		[name,lastname,email,password,id],
		function (error, result, fields) {
            console.log(error)
			res.send(result);
		},
	);
});



app.get("/cart/:id", (req, res) => {
	let id = req.params.id;
	pool.query(
		"SELECT * FROM motos JOIN commands ON motos.id = commands.moto_id WHERE commands.user_id = ?",
		[id],
		function (error, result, fields) {
			res.send(result);
		},
	);
});

app.delete("/delete-reservation/:id", (req, res) => {
	let id = req.params.id;
	pool.query(
		"DELETE FROM commands WHERE id = ?",
		[id],
		function (error, result, fields) {
			console.log(result);
		},
	);
});


app.listen(3001, () => {
    console.log('vous ecoutez le port http://localhost:3001')
});