import { useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import "./App.css";
const App = () => {
  const [theme, setTheme] = useState("light");
  const inputRef = useRef<HTMLInputElement>(null);
  const [calculatedValue, setCalculatedValue] = useState<string | null>(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      const inputValue = inputRef.current.value;

      //enter only number value
      if (isNaN(Number(inputValue))) {
        alert("Please enter only number value");
        return;
      } else if (inputValue === "") {
        setCalculatedValue(null);
        return;
      }

      setCalculatedValue(calculateWaterIntake(Number(inputValue)));
    }
  };

  const calculateWaterIntake = (weight: number) => {
    const waterIntake = weight * 2.2 * (30 / 2);
    return waterIntake.toFixed(2);
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <div className={`${theme}`} style={{margin:"10px", padding: "10px", borderRadius: 5 }}>
        <h1> How much should you drink every day?</h1>

        <h2>
          💧{" "}
          {calculatedValue ? (
            calculatedValue
          ) : (
            <span style={{ color: "red" }}>---</span>
          )}{" "}
          milliliters(ML) of water per day
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            ref={inputRef}
            placeholder="Please enter your weight (kilograms/kg)"
          />

          <button type="submit">Calculate</button>
          <button type="reset" onClick={() => setCalculatedValue(null)}>
            Reset
          </button>
        </form>
        <br />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
