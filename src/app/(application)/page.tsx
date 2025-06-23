import { SidebarProfile } from "@/components/SidebarProfile";
import TabsSection from "@/components/TabsSection";
import * as motion from "motion/react-client";

export default function Home() {
  return (
    <main
      className="wrapper flex flex-col py-10 sm:flex-row"
      style={{ gap: "clamp(2.5rem, 4cqi, 4rem)" }}
    >
      <SidebarProfile />
      <motion.section
        className="flex-1 sm:overflow-hidden"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <TabsSection />
      </motion.section>
    </main>
  );
}
