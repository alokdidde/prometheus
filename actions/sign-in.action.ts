"use server";

import { signIn } from "@/auth";

interface SignInFormData {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  callbackUrl?: string;
}

// Define the server action separately with TypeScript types
export async function handleSignIn(formData: FormData): Promise<void> {
  "use server";

  const data: SignInFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: "/feed",
  };

  await signIn("credentials", data);
}
