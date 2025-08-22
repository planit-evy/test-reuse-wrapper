import { useCallback, useState } from "react";
import {
  AutodeskViewer,
  getAggregateSelection,
  loadModelByUrn,
  unloadModelByUrn,
} from "viewer-npm-test";

import "./App.css";
//test

export function App() {
  const [urn, setUrn] = useState(
    "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnRMT20wUTMxUmVpcWRXS3lsWUVfcHc_dmVyc2lvbj0yMA",
  );
  const [token, setToken] = useState("");

  const [mappingData, setMappingData] = useState<any[]>([]);
  const [guids, setGuids] = useState<string[]>([
    "80847445-e81d-4c60-9562-cf7468e2bf45-0012661c",
  ]);

  const [urnToLoad, setUrnToLoad] = useState<string>("");

  const mappingCallback = useCallback((data: any) => {
    console.log("MAPPING CALLBACK: ", data);
    setMappingData((prevState) => [...prevState, data]);
  }, []);

  const clearCallback = useCallback(() => {
    console.log("CLEAR CALLBACK RUN");
    setMappingData([]);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>Vite + React</h1>
      <label htmlFor={"urn"}>URN</label>
      <input id={"urn"} value={urn} onChange={(e) => setUrn(e.target.value)} />
      <label htmlFor={"token"}>Token</label>
      <input
        id={"token"}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <label htmlFor={"guids"}>Guids</label>
      <input
        id={"guids"}
        value={guids.join(",")}
        onChange={(e) => setGuids(e.target.value.split(","))}
      />
      <button
        onClick={() =>
          getAggregateSelection({
            guids: guids,
            guidsAndModels: mappingData,
            // @ts-ignore
            viewer: window?.NOP_VIEWER,
            isolate: true,
            zoom: true,
          })
        }
      >
        select guids
      </button>
      <label htmlFor={"urnToLoad"}>Load model</label>
      <input
        id={"urnToLoad"}
        value={urnToLoad}
        onChange={(e) => setUrnToLoad(e.target.value)}
      />
      <button
        onClick={() => {
          loadModelByUrn({
            urn: urnToLoad,
            // @ts-ignore
            viewer: window?.NOP_VIEWER,
            keepCurrentModels: true,
            preserveView: true,
          });
        }}
      >
        load
      </button>
      <button
        onClick={() => {
          unloadModelByUrn({
            urn: urnToLoad,
            // @ts-ignore
            viewer: window?.NOP_VIEWER,
          });
        }}
      >
        unload
      </button>

      <div style={{ width: "600px", height: "400px", position: "relative" }}>
        {urn && token && (
          <AutodeskViewer
            urn={urn}
            accessToken={token}
            mappingCallback={mappingCallback}
            clearCallback={clearCallback}
          />
        )}
        {(!urn || !token) && (
          <div>Please enter urn and token to mount viewer</div>
        )}
      </div>
    </div>
  );
}
