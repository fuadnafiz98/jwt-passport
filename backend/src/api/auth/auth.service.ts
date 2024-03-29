import { randomBytes } from "crypto";
import prisma from "../../loaders/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  generateToken,
  generateResetToken,
  validateToken,
} from "../../auth/jwt";
import { User } from ".prisma/client";

async function signUp({
  username,
  email,
  password,
  role,
}: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  const fetchedUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (fetchedUser) {
    throw new Error("user already created");
  }

  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });
  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      role: role,
      refresh_token: "",
      password: hashedPassword,
    },
  });

  const token = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    false
  );

  const refreshToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    true
  );

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      refresh_token: refreshToken,
    },
  });

  console.log("[auth-service], user: ", updatedUser);

  return {
    username: user.username,
    userId: user.id,
    role: user.role,
    token: token,
    refreshToken,
  };
}

async function signIn({
  name,
  password,
  email,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<{
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  role: string;
  _id: string;
}> {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("user not found");
  }

  const validPassword = await argon2.verify(user.password, password);
  if (validPassword) {
    const token = generateToken(
      {
        name,
        _id: user.id.toString(),
        role: user.role,
      },
      false
    );
    const refreshToken = generateToken(
      {
        _id: user.id.toString(),
        name: user.username,
        role: user.role,
      },
      true
    );

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        refresh_token: refreshToken,
      },
    });

    console.log("[auth-controller], updated user: ", updatedUser);

    return {
      name,
      email: user.email,
      token,
      refreshToken,
      role: user.role,
      _id: user.id.toString(),
    };
  } else {
    throw new Error("invalid password");
  }
}

//@ts-ignore
async function signOut({ userInfo }) {
  console.log("[service]", userInfo);
  if (userInfo === null || userInfo.name === null) return;

  const updatedUser = await prisma.user.update({
    where: { email: userInfo.email },
    data: {
      refresh_token: "",
    },
  });

  console.log("[auth-service], updated user: ", updatedUser);
}

async function checkToken(
  //@ts-ignore
  cookies
): Promise<{
  name: string;
  token: string;
  refreshToken: string;
  role: string;
  _id: string;
} | null> {
  if (cookies === null) return null;
  const refreshToken = cookies["refreshToken"];
  if (refreshToken === null) return null;

  const user = validateToken(refreshToken, true);
  if (user === null) return null;

  const result = await prisma.user.findFirst({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (result === null) return null;
  const token = generateToken(
    {
      _id: result.id.toString(),
      name: result.username,
      role: result.role,
    },
    false
  );
  return {
    _id: result.id.toString(),
    token,
    refreshToken,
    role: result.role,
    name: result.username,
  };
}

async function generateResetLink({ email }: { email: string }): Promise<{
  email: string;
  token: string;
} | null> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user === null) return null;
  const token = generateResetToken({ userId: user.user_id, email: user.email });

  return {
    email: email,
    token: token,
  };
}

async function resetPassword({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) {
  try {
    jwt.verify(token, "SUPERSECRET");
  } catch (error) {
    console.log("[auth.service]", error);
    return null;
  }

  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });

  const user = await prisma.user.update({
    where: { email: email },
    data: {
      password: hashedPassword,
      refresh_token: "",
    },
    select: {
      id: true,
      user_id: true,
      username: true,
      role: true,
    },
  });

  const genToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    false
  );

  const refreshToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    true
  );

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      refresh_token: refreshToken,
    },
  });

  console.log("[auth-service-reset], user: ", updatedUser);

  return {
    username: user.username,
    userId: user.id,
    role: user.role,
    token: genToken,
    refreshToken,
  };
}

async function changePassword({
  email,
  oldPassword,
  newPassword,
}: {
  email: string;
  newPassword: string;
  oldPassword: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("user not found");
  }

  const validPassword = await argon2.verify(user.password, oldPassword);
  if (!validPassword) {
    throw new Error("Old password not currect!");
  }

  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(newPassword, { salt });

  await prisma.user.update({
    where: { email: email },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      user_id: true,
      username: true,
      role: true,
    },
  });

  const genToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    false
  );

  const refreshToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.username,
      role: user.role,
    },
    true
  );

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      refresh_token: refreshToken,
    },
  });

  console.log("[auth-service-change], user: ", updatedUser);

  return {
    username: user.username,
    userId: user.id,
    role: user.role,
    token: genToken,
    refreshToken,
  };
}

export {
  checkToken,
  changePassword,
  generateResetLink,
  resetPassword,
  signIn,
  signUp,
  signOut,
};
