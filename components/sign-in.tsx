
import { handleSignIn } from "@/actions/sign-in.action";
// Define the type for form data


export function SignIn() {
  return (
    <form
      action={handleSignIn}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
