import React from "react";
import LoginForm from "../_components/loginForm";
import AuthHero from "../_components/AuthHero";

function LoginPage() {
  return (
     <>
     <section className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto flex min-h-screen items-center px-4 py-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <AuthHero />

          <div className="mx-auto w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </section> 
      </>
  );
}

export default LoginPage;
