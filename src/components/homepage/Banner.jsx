import Image from "next/image";

export default function Banner() {
  return (
    <section className="fit-hero-wrap">
      <div className="card fit-hero">
        <div className="fit-hero-content">
          <p className="fit-hero-label">WORKOUT LIBRARY</p>

          <h1 className="fit-hero-title">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="fit-hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href="#library" className="btn btn-primary fit-browse-btn">
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="fit-hero-image">
          <Image
            src="/assets/banner.png"
            width={420}
            height={500}
            alt="Workout demonstration on a gym machine"
            priority
            className="fit-banner-image"
          />
        </div>
      </div>
    </section>
  );
}