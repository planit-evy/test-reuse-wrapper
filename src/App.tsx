import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AutodeskViewer from "viewer-npm-test";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [urn, setUrn] = useState(
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnRMT20wUTMxUmVpcWRXS3lsWUVfcHc_dmVyc2lvbj0yMA",
  );
  const [token, setToken] = useState("");

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <label htmlFor={"urn"}>URN</label>
      <input id={"urn"} value={urn} onChange={(e) => setUrn(e.target.value)} />
      <label htmlFor={"token"}>Token</label>
      <input
        id={"token"}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <div style={{ width: "600px", height: "400px", position: "relative" }}>
        {urn && token && <AutodeskViewer urn={urn} accessToken={token} />}
        {(!urn || !token) && (
          <div>Please enter urn and token to mount viewer</div>
        )}
      </div>
    </div>
  );
}

export default App;
