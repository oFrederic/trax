import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./artistsData";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync();

const playlistsNames = [
  "All the Colours of My Dreams",
  "Being a Misfit",
  "The World Becomes A Fantasy",
  "Elevator Dance Party",
  "The Soundtrack to Your Summer",
  "Wolves In The Night",
  "Heartbeats",
  "The Quirkiest Dance Party In The World",
  "When It's Just Me And My Friends",
  "Every Mood Imaginable",
  "Deep Dark Secrets",
  "Just Listen To The World Around You",
  "Auditory Hallucination",
  "Creating a New Self",
  "Distorted Reality",
  "Entering a Parallel Dimension",
  "Songs That Made Me a Better Person",
  "We're Going to the Moon",
  "Music That'll Defrost Your Heart",
  "If My Heart Had a Voice",
  "Getting lost in what I love",
  "We’re made of stardust",
  "Escape the ordinary",
  "Growing & Glowing",
  "She wore moonlight like lingerie",
  "Angel energy",
  "Memories of love",
  "Melting kisses",
  "Holding hands",
  "Flowers in my heart",
  "Ocean Goddess",
  "Time travel",
  "The golden daze of summer",
  "Stargazing into early mornings",
  "Songs about being free",
];

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
        name: playlistsNames[i],
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
