import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [key, setKey] = useState("");
  const [volume, setVolume] = useState(0.50);
  const [power, setPower] = useState(true);
  
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if(power){
        playSound(event.key.toUpperCase());
      }
    };
    if(power){
      document.addEventListener("keydown", handleKeyDown);
    } else{
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () =>{
      document.removeEventListener("keydown", handleKeyDown);
    }
    
  }, [playSound, power]);

  const drumPads = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  function playSound(selector) {
    const audio = document.getElementById(selector);
    if(audio){
      setTimeout(()=>{
      audio.currentTime = 0;
      audio.volume = volume;
      },0)
    }
    audio.play();

    let noteName = "";
    switch (selector) {
      case "Q":
        noteName = "Heater 1";
        break;
      case "W":
        noteName = "Heater 2";
        break;
      case "E":
        noteName = "Heater 3";
        break;
      case "A":
        noteName = "Heater 4";
        break;
      case "S":
        noteName = "Clap";
        break;
      case "D":
        noteName = "Open HH";
        break;
      case "Z":
        noteName = "Kick n' Hat";
        break;
      case "X":
        noteName = "Kick";
        break;
      case "C":
        noteName = "Closed HH";
        break;
      default:
        noteName = {key};
    }
    setKey(noteName);
  }
  function handleVolumeChange(event) {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setKey(`Volume: ${Math.round(newVolume * 100)}`)
    setTimeout(()=>{
      setKey("");
    }, 1000);
  }
  function togglePower(){
    
      setKey("");
     
  setPower(!power)
    const switchElement = document.getElementById('switch');
    switchElement.classList.toggle('off', !power);
    switchElement.classList.toggle('on', power);
    
  
    
}
  return (
    <div className="App">
      <div id="drum-machine">
        <div className="drum-pads">
          {drumPads.map((drumPad) => (
            <div
            key={drumPad.src}
            onClick={() => {
              if (power) {
                playSound(drumPad.text);
              }
              
              }}
              className={`drum-pad ${!power ? 'off' : ""}`}
              id={drumPad.src}
            >
              {drumPad.text}
              <audio
                className="clip"
                id={drumPad.text}
                src={drumPad.src}
              ></audio>
            </div>
          ))}
        </div>
        <div className="controls">
          
          <div id="power" onClick={togglePower}>
            <h4 id="power--title">Power</h4>
            <div id="switch">
              <p id="slider">{power ? "On" : "Off"}</p>
            </div>
          </div>
            
          <div id="display">{key}</div>
          <div id="volume">
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            
          />
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
export default App;