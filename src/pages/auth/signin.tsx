import { GetServerSideProps } from "next";
import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";

interface SignInProps {
  providers: Record<LiteralUnion<string, string>, ClientSafeProvider>;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
