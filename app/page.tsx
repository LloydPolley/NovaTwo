import Carousel from "../components/Music/Carousel";
import { getAllArtistsWhere } from "../api/getTracks";
import Hero from "../components/LayoutComps/Hero";
import { getTracksWhere, getAllReleases } from "../api/getTracks";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";
import { neon } from "@neondatabase/serverless";

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * FROM users`;
  return response;
}

export default async function Dj() {
  const users = await getAllArtistsWhere();
  const tracks = await getAllReleases();
  const mixes = await getTracksWhere("mix", true);

  const data = await getData();

  console.log("data", data);

  return (
    <>
      <>
        {data.map((item) => (
          <div key={item.id}>
            Name: {item.name}Value:
            <span className="bg-red-700">{item.email}</span>
          </div>
        ))}
      </>
      <Hero />
      <div className="flex flex-col gap-6 mt-5">
        <Carousel
          Component={UserWidget}
          items={users}
          text={"Featured Artists"}
        />
        <Carousel
          Component={Track}
          items={tracks}
          text={"Releases"}
          url={"f=releases"}
          glass="3"
        />
        <Carousel
          Component={Track}
          items={mixes}
          text={"Mixes"}
          url={"f=mix"}
          glass="5"
        />
      </div>
    </>
  );
}
