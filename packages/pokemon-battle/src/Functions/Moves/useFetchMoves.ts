import { useLazyGetMoveByUrlQuery } from "chriskuhtz-pokemon-api";
import { useState } from "react";
import { LoadedMove } from "../../Models/Move";

export const useFetchMoves = () => {
  const [trigger] = useLazyGetMoveByUrlQuery();
  const [moves, setMoves] = useState<LoadedMove[]>([]);

  const fetchMoves = async (urls: string[]) => {
    await Promise.allSettled(
      urls.map((url) => {
        return trigger(url, true);
      })
    ).then((res) => {
      const onlyFulfilled = res
        .filter((r) => r.status === "fulfilled")
        // @ts-ignore
        .map((r) => r.value.data);

      setMoves(onlyFulfilled);
    });
  };

  return { fetchMoves, moves };
};
