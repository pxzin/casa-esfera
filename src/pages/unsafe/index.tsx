//a simple text page with a button that redirects to the login page
import React from "react";
import { useRouter } from "next/router";

const TestPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => router.push("/auth/login")}>Go to Login</button>
    </div>
  );
};

export default TestPage;
