import { Box, Typography, Divider } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface SingularMoveDetails {
  setShowDetails: (x: boolean) => void;
  data: {
    damage_class: { name: string };
    meta: {
      max_hits: number;
      min_hits: number;
      max_turns: number;
      min_turns: number;
      ailment: { name: string };
      ailment_chance: number;
      crit_rate: number;
      flinch_chance: number;
      drain: number;
      healing: number;
    };
    type: { name: string };
    accuracy: number;
    effect_entries: { effect: string }[];
    target: { name: string };
    power: number;
    pp: number;
    priority: number;
    stat_changes: { change: number; stat: { name: string } }[];
    effect_chance: number;
  };
}
const SingularMoveDetails = ({
  data,
  setShowDetails,
}: SingularMoveDetails): JSX.Element => {
  console.log(data);
  return (
    <Box>
      <Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <strong>Move Type: {data.damage_class.name}</strong>
          <CloseIcon onClick={() => setShowDetails(false)} />
        </Box>
      </Typography>
      <Divider />
      {data.meta.max_hits !== null && (
        <Typography>
          <strong>
            Multi Hit: {data.meta.min_hits} - {data.meta.max_hits}
          </strong>
        </Typography>
      )}
      {data.meta.max_turns !== null && (
        <>
          <Divider />
          <Typography>
            <strong>
              Multi Turn: {data.meta.min_turns} - {data.meta.max_turns}
            </strong>
          </Typography>{" "}
        </>
      )}{" "}
      <Divider />
      <Typography>
        <strong>Type: {data.type.name}</strong>
      </Typography>{" "}
      <Divider />
      <Typography>{data.effect_entries[0].effect}</Typography>
      {!["user", "users-field"].includes(data.target.name) && (
        <>
          <Divider />
          <Typography>
            Accuracy:{" "}
            {data.accuracy === null ? "always hits" : data.accuracy + "%"}
          </Typography>{" "}
        </>
      )}
      <Divider />
      <Typography>Target: {data.target.name}</Typography>{" "}
      {data.meta.ailment.name !== "none" && (
        <>
          <Divider />
          <Typography>
            Status Effect:{" "}
            {data.meta.ailment_chance === 0 ? 100 : data.meta.ailment_chance}%
            chance of {data.meta.ailment.name}
          </Typography>{" "}
        </>
      )}
      {["physical", "special"].includes(data.damage_class.name) && (
        <>
          <Divider />
          <Typography>
            Damage: {data.power === null ? "Edge Case" : data.power}
          </Typography>
        </>
      )}
      <Divider />
      <Typography>Power Points: {data.pp}</Typography>
      {data.meta.crit_rate !== 0 && (
        <>
          {" "}
          <Divider />
          <Typography>
            Increased Crit Chance by {data.meta.crit_rate}
          </Typography>{" "}
        </>
      )}
      {data.meta.flinch_chance !== 0 && (
        <>
          {" "}
          <Divider />
          <Typography>
            Flinch Chance: {data.meta.flinch_chance}%
          </Typography>{" "}
        </>
      )}
      {data.meta.drain !== 0 && (
        <>
          <Divider />
          <Typography>Heals by Draining: {data.meta.drain}%</Typography>{" "}
        </>
      )}
      {data.meta.healing !== 0 && (
        <>
          <Divider />
          <Typography>Heals by: {data.meta.healing}%</Typography>{" "}
        </>
      )}
      {data.stat_changes.length !== 0 && (
        <>
          <Divider />
          <Typography>
            Stat Changes: {data.effect_chance}% chance of{" "}
            {data.stat_changes.map((s, i) => (
              <span>
                {s.change > 0 ? `+${s.change}` : s.change} {s.stat.name}
                {i !== data.stat_changes.length - 1 && ", "}
              </span>
            ))}
          </Typography>{" "}
        </>
      )}
      {data.priority === 1 && (
        <>
          <Divider />
          <Typography>Has Priority </Typography>
        </>
      )}
    </Box>
  );
};

export default SingularMoveDetails;
