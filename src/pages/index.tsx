import React from "react";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { Container, Typography, Button } from "@mui/material";
import { Session } from "next-auth";

interface IndexPageProps {
  session: Session | null;
}

const IndexPage = ({ session }: IndexPageProps) => {
  if (!session) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => signOut()}>
        Logout
      </Button>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default IndexPage;
