import React, { useState, useContext, useEffect } from "react";
import "bulma/css/bulma.css";
import {
  AuthCheck,
  FirebaseAppProvider,
  SuspenseWithPerf,
  useAuth,
  useUser,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";
import Navbar from "./components/Navbar";
import Duel from "./components/Duel";

const firebaseConfig = {
  apiKey: "AIzaSyDKtQz5RXBdke_IzfVMQzPjsMwoMkLxFGs",
  authDomain: "codepraxis-3d053.firebaseapp.com",
  databaseURL: "https://codepraxis-3d053.firebaseio.com",
  projectId: "codepraxis-3d053",
  storageBucket: "codepraxis-3d053.appspot.com",
  messagingSenderId: "431252934048",
  appId: "1:431252934048:web:f7612e32e03a04e754a8c5",
  measurementId: "G-WD0YTZ10D4",
};
const LobbyContext = React.createContext();

function LobbyProvider(props) {
  const { email, displayName, uid } = useUser();
  const lobbyCollection = useFirestore().collection("lobby");
  const lobby = useFirestoreCollectionData(lobbyCollection);

  const userInLobby = lobby.find((m) => m.email === email);
  const opponentInLobby = lobby.find((m) => m.opponentEmail === email);

  const joinLobby = async () => {
    await lobbyCollection.doc(uid).set({ email, displayName, ready: false, handle:"", rating:0,opponentEmail:"" });
  };
  const leaveLobby = async () => {
    await lobbyCollection.doc(uid).delete();
  };

  const update = async(rating, handle) => {
    await lobbyCollection
      .doc(uid)
      .set({ rating:rating, handle:handle }, { merge: true });
  }

  const toggleReadiness = async (newReadiness) => {
    await lobbyCollection
      .doc(uid)
      .set({ ready: newReadiness }, { merge: true });
  };

  const startBattle = async (opponentEmail) => {
    await lobbyCollection
      .doc(uid)
      .set({ battling: true, opponentEmail }, { merge: true });
  };

  const endBattle = async () => {
    await lobbyCollection.doc(uid).set({ battling: false }, { merge: true });
  };
  return (
    <LobbyContext.Provider
      value={{
        userInLobby,
        lobby,
        joinLobby,
        leaveLobby,
        update,
        toggleReadiness,
        startBattle,
        endBattle,
        opponentInLobby,
      }}
    >
      {props.children}
    </LobbyContext.Provider>
  );
}

function HandleforLobby() {
  const {
    userInLobby,
    opponentInLobby,
    lobby,
    update,
    startBattle,
    endBattle,
  } = useContext(LobbyContext);

  const [handle, setHandle] = useState("ibne_batuta");
  const [rating, setRating] = useState(1500);

  const handleChange = (event) => {
    setHandle(event.target.value);
  };

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const handleSubmit =  () => {
    //  fetch(
    //   `${proxyUrl}https://codeforces.com/api/user.info?handles=${handle}`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     let tmp = res["result"].rating;
    //     setRating(tmp); 
    //   });
      console.log("kuch to bolo " +handle);
      console.log(rating);
      update(rating,handle);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          CF Handle : 
          <input type="text" value={handle} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

function Lobby() {
  const {
    userInLobby,
    opponentInLobby,
    lobby,
    startBattle,
    endBattle,
  } = useContext(LobbyContext);
  const { email, displayName, uid , handle } = useUser();

  const [fight, setFight] = useState("");
  const [show, setShow] = useState("Invite");
  const [invite, setInvite] = useState(false);
  const handleChange = (email) => {
    setFight(email);
    startBattle(email);
  };

  useEffect(() => {
    if (opponentInLobby && opponentInLobby.battling === true) {
      setInvite(true);
      console.log("chitti aayi hai aayi hai");
    }
  });

  return (
    <div className="container is-fluid">
      {invite === true ? (
        <Duel name={displayName} opponent={opponentInLobby.displayName}  />
      ) : (
        lobby.map((m) => {
          return (
            <article key={m.email} className="tile is-child notification">
              <p className="title">
                {m.displayName} - {m.ready ? "Ready 🎮" : "Not Ready ❌"}
                {m.email !== email && m.ready === true && (
                  <button
                    className="bg-green-500 m-2 p-3 rounded-full"
                    onClick={() => handleChange(m.email)}
                  >
                    Invite
                  </button>
                )}
                { userInLobby && userInLobby.ready === true && fight === m.email && (
                  <Duel name={displayName} opponent={m.displayName} />
                )}
              </p>
            </article>
          );
        })
      )}
    </div>
  );
}

const LobbyActions = () => {
  const { userInLobby, joinLobby, leaveLobby, toggleReadiness } = useContext(
    LobbyContext
  );
  let components = [];

  if (userInLobby) {
    components.push(
      <div key="readyButton" className="column is-1">
        <button
          key="readyButton"
          className="button is-primary"
          onClick={() => toggleReadiness(!userInLobby.ready)}
        >
          {userInLobby.ready ? "Not Ready!" : "Ready!"}
        </button>
      </div>
    );
    components.push(
      <div key="leaveButton" className="column is-1">
        <button className="button is-primary" onClick={leaveLobby}>
          Leave
        </button>
      </div>
    );
  } else {
    components.push(
      <div key="joinButton" className="column is-1">
        <button className="button is-primary" onClick={joinLobby}>
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="container is-fluid">
      <div className="columns">{components}</div>
    </div>
  );
};

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf
        fallback={<p>Loading...</p>}
        traceId={"loading-app-status"}
      >
        <Navbar />
        <AuthCheck fallback={<p>Not Logged In...</p>}>
          <LobbyProvider>
            <Lobby />
            <LobbyActions />
          </LobbyProvider>
        </AuthCheck>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
}

export default App;
