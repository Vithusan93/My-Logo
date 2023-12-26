import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
//import Header from "../../components/header";
const styles = {};
const Signin = async () => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div />
      <div>
        <div>
          <Image
            src="/katalog_full.svg"
            width="196"
            height="64"
            alt="App Logo"
            style={{ height: "85px", marginBottom: "20px" }}
          />
          <div>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input placeholder="Email (Not Setup - Please Use Github)" />
            <button>Submit</button>
            <hr />
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/login_pattern.svg" alt="Pattern Background" />
    </div>
  );
};

export default Signin;
