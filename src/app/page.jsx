// import Banner from "@/components/homepage/Banner";

// export default function Home() {
//   return (
//     <>
//       <Banner />

//       <section id="library" className="container library">
//         <h2>THE LIBRARY</h2>
//         <p>Workout cards will appear here.</p>
//       </section>
//     </>
//   );
// }

// import Banner from "@/components/homepage/Banner";
// export default function Home() {
//   return (
//     <>
//       <Banner />
//       <section id="library" className="fit-container pb-16">
//         <h2 className="text-3xl">THE LIBRARY</h2>
//         <p className="mt-2 text-base-content/65">
//           API workout cards will appear in step 4.
//         </p>
//       </section>
//     </>
//   );
// }

import Banner from "@/components/homepage/Banner";
import Workouts from "@/components/homepage/Workouts";

export default function Home() {
  return (
    <>
      <Banner />
      <Workouts />
    </>
  );
}