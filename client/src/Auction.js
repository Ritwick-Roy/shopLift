import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import asyncHandler from "express-async-handler";
import axios from "axios";

var socket;

const Auction = () => {
  const [bids, setBids] = useState([]);
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/leaderboard")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBids(data);
      });
  }, [bids]);

  useEffect(() => {
    socket = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.on("message received", (bid) => {
      setBids([...bids, bid]);
      console.log(bid);
    });
  });

  const handleSubmit = asyncHandler(async (e) => {
    e.preventDefault();
    if (item && name && price) {
      axios.post("http://localhost:8000/api/createbid", { item, name, price })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
      setItem("");
      setName("");
      setPrice("");
    }
  });

  return (
    <div>
      Leader
      {bids.map((d) => (
        <li>
          {d.name}:{d.price}
        </li>
      ))}
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <input
          id="input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          id="input"
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <button type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Auction;
