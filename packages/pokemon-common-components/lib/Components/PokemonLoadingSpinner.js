import React from "react";
import { useSpring, animated, config } from "react-spring";
export var PokemonLoadingSpinner = function (_a) {
    var index = _a.index;
    var props = useSpring({
        to: { transform: "rotate(0deg)" },
        from: { transform: "rotate(359deg)" },
        loop: true,
        config: config.gentle,
    });
    return (React.createElement(animated.img, { style: props, height: "96px", width: "96px", alt: "pokemon icon", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            index +
            ".png" }));
};
//# sourceMappingURL=PokemonLoadingSpinner.js.map