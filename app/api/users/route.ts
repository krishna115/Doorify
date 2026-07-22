import { NextRequest, NextResponse } from "next/server";

import { admin } from "@/lib/admin";

export async function GET() {
  try {
    const { data: profiles, error } = await admin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }

    const { data: authUsers } =
      await admin.auth.admin.listUsers();

    const users = profiles.map((profile) => {
      const authUser = authUsers.users.find(
        (user) => user.id === profile.id
      );

      return {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        email: authUser?.email ?? "",
        created_at: profile.created_at,
      };
    });

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, password, role } = body;

    const { data: authUser, error } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }

    const { error: profileError } = await admin
      .from("profiles")
      .insert({
        id: authUser.user.id,
        name,
        role,
      });

    if (profileError) {
      await admin.auth.admin.deleteUser(
        authUser.user.id
      );

      return NextResponse.json(
        profileError.message,
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      id,
      name,
      email,
      password,
      role,
    } = body;

    const authUpdate: {
      email?: string;
      password?: string;
    } = {};

    if (email) {
      authUpdate.email = email;
    }

    if (password) {
      authUpdate.password = password;
    }

    if (Object.keys(authUpdate).length > 0) {
      const { error } =
        await admin.auth.admin.updateUserById(
          id,
          authUpdate
        );

      if (error) {
        return NextResponse.json(
          error.message,
          {
            status: 400,
          }
        );
      }
    }

    const { error } = await admin
      .from("profiles")
      .update({
        name,
        role,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id =
      request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        "Missing id",
        {
          status: 400,
        }
      );
    }

    await admin
      .from("profiles")
      .delete()
      .eq("id", id);

    await admin.auth.admin.deleteUser(id);

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}