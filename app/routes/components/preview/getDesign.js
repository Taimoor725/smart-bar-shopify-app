    export const getDesignStyle = (designtype, baseColor) => {
        const overlayColor = "rgba(255,255,255,0.25)";
        switch (designtype) {
            case "solid":
                return { backgroundColor: baseColor };
            case "gradient":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `linear-gradient(90deg, ${overlayColor}, transparent)`,
                };
            case "linear":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `repeating-linear-gradient(45deg, ${overlayColor}, ${overlayColor} 8px, transparent 8px, transparent 16px)`,
                };
            case "cross":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `
            repeating-linear-gradient(0deg, ${overlayColor}, ${overlayColor} 2px, transparent 2px, transparent 12px),
            repeating-linear-gradient(90deg, ${overlayColor}, ${overlayColor} 2px, transparent 2px, transparent 12px)
          `,
                };
            case "diamond":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `
            repeating-linear-gradient(45deg, ${overlayColor}, ${overlayColor} 5px, transparent 5px, transparent 20px),
            repeating-linear-gradient(-45deg, ${overlayColor}, ${overlayColor} 5px, transparent 5px, transparent 20px)
          `,
                };
            case "stripes":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `repeating-linear-gradient(0deg, ${overlayColor}, ${overlayColor} 10px, transparent 10px, transparent 20px)`,
                };
            case "dots":
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `
            radial-gradient(${overlayColor} 15%, transparent 16%),
            radial-gradient(${overlayColor} 15%, transparent 16%)
          `,
                    backgroundPosition: "0 0, 10px 10px",
                    backgroundSize: "20px 20px",
                };
            default:
                return { backgroundColor: baseColor };
        }
    };