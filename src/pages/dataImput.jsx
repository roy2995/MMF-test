import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Page1 = () => {
  const navigate = useNavigate();

  const [stringInput, setStringInput] = useState("");
  const [sex, setSex] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (!stringInput.trim()) {
      setErrorMessage("Username is required.");
      return false;
    }
    if (!sex) {
      setErrorMessage("Please select a gender.");
      return false;
    }
    if (!numberInput || isNaN(numberInput) || numberInput <= 0) {
      setErrorMessage("Please enter a valid age.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      const userData = { stringInput, sex, numberInput };
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/page2");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-black"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { backgroundColor: "rgba(0, 0, 0, 0)", opacity: 0 },
        visible: { backgroundColor: "rgba(0, 0, 0, 1)", opacity: 1 },
      }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
            <CardDescription>Please fill out the form below:</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter a username"
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}
              className="w-full"
            />
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full p-2 border rounded-md mt-4"
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <Input
              type="number"
              placeholder="Enter an age"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              className="w-full mt-4"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
            )}
            <Button onClick={handleSubmit} className="w-full mt-4">
              Next
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Page1;
