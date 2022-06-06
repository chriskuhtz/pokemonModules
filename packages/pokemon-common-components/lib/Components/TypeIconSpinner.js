import React from "react";
import { useSpring, config, animated } from "react-spring";
import bug from "../Assets/types/bug.png";
import dark from "../Assets/types/dark.png";
import dragon from "../Assets/types/dragon.png";
import electric from "../Assets/types/electric.png";
import fairy from "../Assets/types/fairy.png";
import fighting from "../Assets/types/fighting.png";
import fire from "../Assets/types/fire.png";
import flying from "../Assets/types/flying.png";
import ghost from "../Assets/types/ghost.png";
import grass from "../Assets/types/grass.png";
import ground from "../Assets/types/ground.png";
import ice from "../Assets/types/ice.png";
import normal from "../Assets/types/normal.png";
import poison from "../Assets/types/poison.png";
import psychic from "../Assets/types/psychic.png";
import rock from "../Assets/types/rock.png";
import steel from "../Assets/types/steel.png";
import water from "../Assets/types/water.png";
var typeEnum;
(function (typeEnum) {
    typeEnum["bug"] = "bug";
    typeEnum["dark"] = "dark";
    typeEnum["dragon"] = "dragon";
    typeEnum["electric"] = "electric";
    typeEnum["fairy"] = "fairy";
    typeEnum["fighting"] = "fighting";
    typeEnum["fire"] = "fire";
    typeEnum["flying"] = "flying";
    typeEnum["ghost"] = "ghost";
    typeEnum["grass"] = "grass";
    typeEnum["ground"] = "ground";
    typeEnum["ice"] = "ice";
    typeEnum["normal"] = "normal";
    typeEnum["poison"] = "poison";
    typeEnum["psychic"] = "psychic";
    typeEnum["rock"] = "rock";
    typeEnum["steel"] = "steel";
    typeEnum["water"] = "water";
})(typeEnum || (typeEnum = {}));
export var TypeIconSpinner = function (_a) {
    var type = _a.type, size = _a.size;
    var props = useSpring({
        to: { transform: "rotate(0deg)" },
        from: { transform: "rotate(359deg)" },
        loop: true,
        config: config.gentle,
    });
    switch (type) {
        case typeEnum.bug: {
            return (React.createElement(animated.img, { style: props, src: bug, alt: typeEnum.bug, height: size, width: size }));
        }
        case typeEnum.dragon: {
            return (React.createElement(animated.img, { style: props, src: dragon, alt: typeEnum.dragon, height: size, width: size }));
        }
        case typeEnum.dark: {
            return (React.createElement(animated.img, { style: props, src: dark, alt: typeEnum.dark, height: size, width: size }));
        }
        case typeEnum.electric: {
            return (React.createElement(animated.img, { style: props, src: electric, alt: typeEnum.electric, height: size, width: size }));
        }
        case typeEnum.fairy: {
            return (React.createElement(animated.img, { style: props, src: fairy, alt: typeEnum.fairy, height: size, width: size }));
        }
        case typeEnum.fighting: {
            return (React.createElement(animated.img, { style: props, src: fighting, alt: typeEnum.fighting, height: size, width: size }));
        }
        case typeEnum.fire: {
            return (React.createElement(animated.img, { style: props, src: fire, alt: typeEnum.fire, height: size, width: size }));
        }
        case typeEnum.flying: {
            return (React.createElement(animated.img, { style: props, src: flying, alt: typeEnum.flying, height: size, width: size }));
        }
        case typeEnum.ghost: {
            return (React.createElement(animated.img, { style: props, src: ghost, alt: typeEnum.ghost, height: size, width: size }));
        }
        case typeEnum.grass: {
            return (React.createElement(animated.img, { style: props, src: grass, alt: typeEnum.grass, height: size, width: size }));
        }
        case typeEnum.ground: {
            return (React.createElement(animated.img, { style: props, src: ground, alt: typeEnum.ground, height: size, width: size }));
        }
        case typeEnum.ice: {
            return (React.createElement(animated.img, { style: props, src: ice, alt: typeEnum.ice, height: size, width: size }));
        }
        case typeEnum.normal: {
            return (React.createElement(animated.img, { style: props, src: normal, alt: typeEnum.normal, height: size, width: size }));
        }
        case typeEnum.poison: {
            return (React.createElement(animated.img, { style: props, src: poison, alt: typeEnum.poison, height: size, width: size }));
        }
        case typeEnum.psychic: {
            return (React.createElement(animated.img, { style: props, src: psychic, alt: typeEnum.psychic, height: size, width: size }));
        }
        case typeEnum.rock: {
            return (React.createElement(animated.img, { style: props, src: rock, alt: typeEnum.rock, height: size, width: size }));
        }
        case typeEnum.steel: {
            return (React.createElement(animated.img, { style: props, src: steel, alt: typeEnum.steel, height: size, width: size }));
        }
        case typeEnum.water: {
            return (React.createElement(animated.img, { style: props, src: water, alt: typeEnum.water, height: size, width: size }));
        }
        default: {
            return (React.createElement(animated.img, { style: props, src: normal, alt: typeEnum.normal, height: size, width: size }));
        }
    }
};
//# sourceMappingURL=TypeIconSpinner.js.map