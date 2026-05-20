import { ClerkProvider, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <main className="auth-page">
        <SignUp />
      </main>
    </ClerkProvider>
  );
}
