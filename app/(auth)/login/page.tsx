"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { AuthService } from "@/features/auth";

export default function LoginPage() {

  const router =
    useRouter();


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    checkingSession,
    setCheckingSession,
  ] = useState(true);


  /*
  =========================================
  CHECK EXISTING SESSION
  =========================================
  */

  useEffect(() => {

    let mounted = true;


    const checkSession =
      async () => {

        try {

          console.log(
            "========== SESSION CHECK =========="
          );

          console.log(
            "Checking for existing Supabase session..."
          );


          const sessionData =
            await AuthService.getSession();


          if (!mounted) {
            return;
          }


          /*
          -----------------------------------------
          No existing session
          -----------------------------------------
          */

          if (
            !sessionData.session
          ) {

            console.log(
              "No existing session."
            );

            console.log(
              "Showing login screen."
            );

            setCheckingSession(false);

            return;

          }


          /*
          -----------------------------------------
          Existing session found
          -----------------------------------------
          */

          console.log(
            "Existing session found."
          );


          console.log(
            "User:",
            sessionData.session.user
          );


          /*
          -----------------------------------------
          Get profile
          -----------------------------------------
          */

          const result =
            await AuthService.getCurrentUser();


          if (!mounted) {
            return;
          }


          /*
          -----------------------------------------
          Get dashboard
          -----------------------------------------
          */

          const dashboard =
            AuthService.getDashboard(
              result.profile.role
            );


          console.log(
            "Existing user role:",
            result.profile.role
          );


          console.log(
            "Redirecting to:",
            dashboard
          );


          /*
          -----------------------------------------
          Redirect
          -----------------------------------------
          */

          router.replace(
            dashboard
          );

          router.refresh();


        } catch (error) {

          console.error(
            "SESSION CHECK FAILED:",
            error
          );


          /*
          -----------------------------------------
          Session may exist but profile could
          not be loaded.

          Don't redirect. Let the user log in
          normally.
          -----------------------------------------
          */

          if (mounted) {

            setCheckingSession(false);

          }

        }

      };


    checkSession();


    return () => {

      mounted = false;

    };

  }, [router]);


  /*
  =========================================
  LOGIN
  =========================================
  */

  const handleSignIn =
    async () => {

      console.clear();

      console.log(
        "========== LOGIN =========="
      );

      console.log(
        "Email:",
        email
      );


      try {

        setLoading(true);


        console.log(
          "STEP 1 : Calling AuthService.login()"
        );


        const result =
          await AuthService.login(
            email,
            password
          );


        const sessionData =
          await AuthService.getSession();


        console.log(
          "SESSION AFTER LOGIN:",
          sessionData.session
        );


        console.log(
          "STEP 2 : Login Success"
        );


        console.log(
          "Profile:",
          result.profile
        );


        const dashboard =
          AuthService.getDashboard(
            result.profile.role
          );


        console.log(
          "STEP 3 : Dashboard",
          dashboard
        );


        console.log(
          "STEP 4 : Redirecting..."
        );


        router.replace(
          dashboard
        );


        console.log(
          "STEP 5 : Refreshing Router..."
        );


        router.refresh();


        console.log(
          "========== LOGIN COMPLETE =========="
        );


      } catch (error) {

        console.error(
          "========== LOGIN FAILED =========="
        );


        console.error(
          error
        );


        if (
          error instanceof Error
        ) {

          console.error(
            error.stack
          );


          alert(
            error.message
          );


        } else {

          alert(
            "Something went wrong."
          );

        }


      } finally {

        setLoading(false);

      }

    };


  /*
  =========================================
  SESSION RESTORATION UI
  =========================================
  */

  if (checkingSession) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-muted/20">

        <div className="w-full max-w-md px-6">

          <div className="rounded-xl border bg-card p-10 text-center shadow-sm">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">

              <Loader2
                className="h-7 w-7 animate-spin text-primary"
              />

            </div>


            <h1 className="text-2xl font-bold">

              Welcome back

            </h1>


            <p className="mt-2 text-sm text-muted-foreground">

              Checking your session...

            </p>


            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />

              <span>

                Restoring your Doorify session

              </span>

            </div>

          </div>

        </div>

      </main>

    );

  }


  /*
  =========================================
  LOGIN UI
  =========================================
  */

  return (

    <main className="flex min-h-screen items-center justify-center bg-muted/20">

      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">

            Doorify

          </h1>


          <p className="mt-2 text-sm text-muted-foreground">

            Sign in to continue

          </p>

        </div>


        <div className="space-y-4">

          {/* -----------------------------
              Email
          ----------------------------- */}

          <input
            type="email"
            placeholder="Email"
            disabled={loading}
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-md border px-4 py-3"
          />


          {/* -----------------------------
              Password
          ----------------------------- */}

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              disabled={loading}
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-md border px-4 py-3 pr-12"
            />


            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowPassword(
                  (prev) =>
                    !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >

              {showPassword ? (

                <EyeOff className="h-5 w-5" />

              ) : (

                <Eye className="h-5 w-5" />

              )}

            </button>

          </div>


          {/* -----------------------------
              Login Button
          ----------------------------- */}

          <button
            type="button"
            onPointerDown={(e) => {

              e.preventDefault();

              handleSignIn();

            }}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading ? (

              <>

                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                />

                Signing In...

              </>

            ) : (

              "Sign In"

            )}

          </button>

        </div>

      </div>

    </main>

  );

}