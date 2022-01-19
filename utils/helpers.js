export const getTemplate = () => {
  const template = {
    title: {
      fontSize: 72,
      fontFamily: "Raleway",
      color: "#fff",
      fontWeight: 700,
      text: "My Awesome Post Title Goes Here",
      lineHeight: 80,
    },
    tagline: {
      fontSize: 35,
      fontFamily: "Playfair-Display",
      color: "#ddd",
      fontWeight: 300,
      text: "written by @rahaf_tahayneh",
      lineHeight: 60,
    },
    background: {
      type: "gradient",
      color1: "#276955",
      color2: "#6ba794",
      direction: 105,
    },
    icon: {
      name: "react",
      color: "#46685f",
      fontSize: 125,
    },
  };
  return template;
};
