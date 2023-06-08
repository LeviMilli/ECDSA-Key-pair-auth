import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privatekey, setPrivatekey] = useState("");
  const [signer, setSigner] = useState("")

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privatekey={privatekey}
        setPrivatekey={setPrivatekey}
        signer={signer}
        setSigner={setSigner}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} signer={signer} setSigner={setSigner} privatekey={privatekey} />
    </div>
  );
}

export default App;
