import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./artistsData";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync();

const run = async () => {
  // Seed fake artists data
  artistsData.map(async (artist) => {
    await prisma.artist.upsert({
      create: {
        name: artist.name,
        songs: {
          create: artist.songs.map((song) => ({
            name: song.name,
            duration: song.duration,
            url: song.url,
          })),
        },
      },
      update: {},
      where: { name: artist.name },
    });
  });

  // Seed fake users data
  const user = await prisma.user.upsert({
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("p@ssword", salt),
    },
    update: {},
    where: { email: "user@test.com" },
  });

  // Seed fake 30 playlists
  const songs = await prisma.song.findMany();
  new Array(30).fill(1).map(async (_, i) => {
    await prisma.playlist.create({
      data: {
        name: `Playlist #${i + 1}`,
        user: {
          connect: { id: user.id },
        },
        songs: {
          connect: songs.map((song) => ({
            id: song.id,
          })),
        },
      },
    });
  });
};

run()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
