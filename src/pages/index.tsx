import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@mui/material";

const HelloWorld: React.FC = () => {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  const handleClick = () => {
    alert(isServer ? "Hello, Server!" : "Hello, Client!");
  };

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        {isServer ? "Hello, Server!" : "Hello, Client!"}
      </Typography>
      <Button onClick={handleClick} variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
};

const Home: React.FC = () => {
  return <HelloWorld />;
};

export default Home;
