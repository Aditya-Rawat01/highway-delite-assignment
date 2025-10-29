import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

// get all experiences
app.get("/experiences", async (req, res) => {
  try {
    const exp = await prisma.experiences.findMany();
    res.json({ msg: "Experiences fetched successfully", exp });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      exp: [],
    });
  }
});

// get experience by id.
app.get("/experiences/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const exp = await prisma.experiences.findFirst({
      where: {
        id,
      },
    });
    if (!exp) {
      res.status(401).json({
        msg: "No destination found",
      });
    }
    res.json({
      msg: "Experience fetched successfully",
      exp: {
        ...exp,
        experience: exp!.destination,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      exp: null,
    });
  }
});

// post promo
app.post("/promo/validate", async (req, res) => {
  const { promo } = req.body;
  if (!promo) {
    res.status(401).json({
      msg: "Empty Promo",
    });
  }
  const ans = await prisma.promos.findFirst({
    where: {
      name: promo,
    },
  });

  if (!ans) {
    res.status(401).json({
      msg: "No Promo found",
    });
  } else {
    res.json({
      msg: "Promo Applied",
      discount: ans.discount,
    });
  }
});

//POST /bookings
app.post("/bookings", async (req, res) => {
  const {
    experience,
    date,
    time,
    quantity,
    subtotal,
    taxes,
    promoCode,
    total,
  } = req.body;
  if (
    !experience ||
    !date ||
    !time ||
    !quantity ||
    !subtotal ||
    !taxes ||
    !total
  ) {
    res.status(401).json({
      msg: "Fields are empty",
    });
    return
  }
  const tempDate = new Date(date);
  const year = tempDate.getFullYear();
  const month = String(tempDate.getMonth() + 1).padStart(2, "0");
  const day = String(tempDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const formattedTime = `${time}:00.000`;

  const isoString = `${formattedDate}T${formattedTime}Z`;
    try {
      const exp = await prisma.experiences.findFirst({
          where:{
              destination:experience
          }
      })
      if (!exp) {
          throw Error("Invalid Booking")
      }

        let arr = exp.slot as []
        for (let i = 0;i<arr?.length;i++) {
          // @ts-ignore
        if (Object.keys(arr[i])[0] === isoString) {
        // @ts-ignore
          const seats:number = Object.values(arr[i])[0]!.available_slots

          if (quantity>seats) {
        res.status(401).json({
          msg: "Seats are filled, try with lower seats"
        })
        return
      } else {
        // @ts-ignore
          Object.values(arr[i])[0]!.available_slots -=quantity
          break
      }
          
      
        }
      }
      await prisma.experiences.update({
          data:{
            slot:arr
          } ,
          where:{
            id:exp.id
          }
        })

      await prisma.bookings.create({
        data:{
          dates:isoString,
          seats:quantity,
          experienceId:exp.id
        }
      })
    return res.json({
      msg:"Booking Completed!"
    })

    } catch (error) {
      res.status(401).json({
          msg: "Invalid Booking"
      })
    }

  
});

// just to seed the experience in database.
app.post("/exp", async (req, res) => {
  const { description, destination, image, location, price, slot, bookings } =
    req.body;
  await prisma.experiences.create({
    data: {
      description,
      destination,
      image,
      location,
      price,
      slot,
      bookings,
    },
  });
  res.json({
    msg: "experience created.",
  });
});

app.listen(3001, () => {
  console.log("Server started at 3001");
});
