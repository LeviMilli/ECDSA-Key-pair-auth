const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04e8a21d8f548ae0921eb25e2af007e2ef16ad77fe105c3b7d59ef6528e5f8757ddb089200ade5cd9058a1771ad3b9dc757c9607977f6b9ba51e79408c96bf90ea": 100,
  "04355480fb1d3aa60584afa602d8177e82f48595f57de633990a95cededf6d7166205f7ca92328c09e030f29e49a227ef958c5a7220053b8ae023660da0fb821b3": 50,
  "0454c69249929411145aca42003e4cc016a905b8e64253f02f0817d25a7f29bf4557605534267281c87c57a07e44b2c318e8f2c397508d780be90544eab512f2dc": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signer } = req.body;

  const messageHash = "squirtle"
  const verified = secp256k1.verify(signer, messageHash, sender);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!verified){
    res.status(400).send({ message: "Unauthorized! Not your funds to send" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
