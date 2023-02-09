import { Users } from "@prisma/client";
import connection from "../database/connection";

async function findByEmail(email: string) {
  return await connection.users.findUnique({ where: { email } });
}

async function create(data: Omit<Users, "id">) {
  return await connection.users.create({ data });
}

async function deleteUser(id: number) {
  return await connection.users.delete({ where: { id } });
}

async function edit(id: number, data: Omit<Users, "id">) {
  return await connection.users.update({ where: { id }, data: data });
}

const authRepository = {
  findByEmail,
  create,
  deleteUser,
  edit,
};

export default authRepository;
