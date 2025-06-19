import { SidebarProfile } from "@/components/SidebarProfile";

export default function Home() {
  return (
    <main
      className="wrapper flex flex-col pt-10 sm:flex-row"
      style={{ gap: "clamp(2.5rem, 4cqi, 4rem)" }}
    >
      <SidebarProfile />
      <section className="flex-1">d</section>
    </main>
  );
}
