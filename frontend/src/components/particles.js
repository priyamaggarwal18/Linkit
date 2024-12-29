import Particles from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = ({ isDarkMode }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    import("@tsparticles/react").then(({ initParticlesEngine }) => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: isDarkMode ? "#000000" : "#ffffff",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.6, 
          },
          push: {
            quantity: 2, 
          },
        },
      },
      particles: {
        color: {
          value: isDarkMode ? "#49aa27" : "#3f6212",
        },
        links: {
          color: isDarkMode ? "#49aa27" : "#3f6212",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          speed: 0.5,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 200,
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: false,
    }),
    [isDarkMode]
  );

  return init ? <Particles options={options} /> : null;
};

export default ParticlesComponent;
