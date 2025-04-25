import HomeComponent from "../components/root/home/Home";
import { SeoTags } from "@/utils/seo/seoTags";
import { seoData } from "@/utils/seo/seo";
// OPEN GDS

export default function Home() {

  return (
    <>
      {session && (<>
        <Text>Bienvenue :  {session?.user?.email}</Text>
        <Button onClick={() => signOut()}>Deco</Button></>
      )}
      <SeoTags page="home" />
      <HomeComponent />
    </>
  );
}
