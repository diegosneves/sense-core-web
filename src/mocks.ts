type UserRow = {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "operator" | "viewer";
  username: string;
};

export const mockUsers: UserRow[] = [
  {
    key: "u1",
    id: "u1",
    name: "Ana Beatriz Costa",
    email: "ana.costa@sensecore.com",
    phone: "+55 (11) 98888-1001",
    role: "admin",
    username: "ana.costa",
  },
  {
    key: "u2",
    id: "u2",
    name: "Bruno Henrique Silva",
    email: "bruno.silva@sensecore.com",
    phone: "+55 (21) 97777-2002",
    role: "manager",
    username: "bruno.silva",
  },
  {
    key: "u3",
    id: "u3",
    name: "Carla Mendes",
    email: "carla.mendes@sensecore.com",
    phone: "+55 (31) 96666-3003",
    role: "operator",
    username: "carla.mendes",
  },
  {
    key: "u4",
    id: "u4",
    name: "Diego Albuquerque",
    email: "diego.albuquerque@sensecore.com",
    phone: "+55 (41) 95555-4004",
    role: "viewer",
    username: "diego.albuquerque",
  },
  {
    key: "u5",
    id: "u5",
    name: "Eduarda Rocha",
    email: "eduarda.rocha@sensecore.com",
    phone: "+55 (51) 94444-5005",
    role: "manager",
    username: "eduarda.rocha",
  },
];

type MockCredential = {
  username: string; // ou email, caso prefira autenticar por email
  password: string;
  userId: string; // relaciona com a lista mockUsers
};
export const mockCredentials: MockCredential[] = [
  { username: "ana.costa", password: "Ana@1234", userId: "u1" },
  { username: "bruno.silva", password: "Bruno@1234", userId: "u2" },
  { username: "carla.mendes", password: "Carla@1234", userId: "u3" },
  { username: "diego.albuquerque", password: "Diego@1234", userId: "u4" },
  { username: "eduarda.rocha", password: "Eduarda@1234", userId: "u5" },
];
