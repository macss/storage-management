import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Compartment } from "../../models";
import { selectAllItems } from "../items/itemsSlice";
import { selectCompartmentHistories } from "./historiesSlice";

const RenderHistories = ({ compartment }: { compartment: Compartment }) => {
  const histories = useAppSelector((state) =>
    selectCompartmentHistories(state, compartment)
  );
  const allItems = useAppSelector(selectAllItems);

  if (!histories) return <div>Nenhum histórico</div>;
  return (
    <div>
      {histories.map((history) => {
        const [item] = allItems.filter((it) => it.id === history.item_id);
        const s = history.amount === 1 ? "" : "s";
        return (
          <p key={history.id}>{`${new Date(
            history.created_at
          ).toLocaleString()}: ${
            history.type === "in" ? "adicionado" : "removido"
          } ${history.amount} unidade${s} do item ${item?.name}`}</p>
        );
      })}
    </div>
  );
};

export default RenderHistories;
