const styles = {
    global: {
      "html, body": {
        backgroundColor: "gray.900",
        color: "whiteAlpha.800",
      },
      svg: {
        cursor: "pointer",
      },
      ".table": {
        border: "1px solid #424242",
      },
      ".tr": {
        display: "flex",
        width: "fit-content",
      },
      ".th, .td": { boxShadow: "inset 0 0 0 1px #424242" },
      ".th": {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "gray.400",
        padding: "0.5rem",
        fontWeight: "bold",
        fontSize: "xs",
        textTransform: "uppercase",
        textAlign: "center",
      },
      ".td > input": {
        m: "1",
        padding: "0.2rem",
        maxW: "100%",
      },
    },
  };
  
  export default styles;